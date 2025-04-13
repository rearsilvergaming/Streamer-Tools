obs = obslua
hotkey_id_current = nil
hotkey_id_all = nil
refresh_timer = nil
refresh_interval = 300
auto_refresh_enabled = false
is_refreshing = false
refresh_delay_ms = 200

function script_description()
    return [[
<b>RearSilver's Browser Refresh</b>
<p>Copyright &copy; 2025 <a style="color: #ffffff; text-decoration: none;"
        >RearSilver</a>
<hr>
<p>This script allows you to refresh browser sources in OBS with various options:</p>
<ul>
    <li>Refresh browser sources in the current scene only</li>
    <li>Refresh all browser sources across all scenes</li>
    <li>Set up automatic refreshing at customizable intervals</li>
    <li>Bind hotkeys to refresh browser sources</li>
    <li>Includes cache-busting and smoother sequential refresh</li>
</ul>
<p>Created by RearSilver. If you find this useful, please drop me a follow and join my streams at
<br>
<a href="https://twitch.tv/rearsilver">https://twitch.tv/rearsilver</a>!</p>
]]
end

function script_properties()
    local props = obs.obs_properties_create()

    local refresh_group = obs.obs_properties_create()
    obs.obs_properties_add_group(props, "refresh_group", "Manual Refresh", obs.OBS_GROUP_NORMAL, refresh_group)
    obs.obs_properties_add_button(refresh_group, "refresh_current", "Refresh Browser Sources in Current Scene", on_click_refresh_current)
    obs.obs_properties_add_button(refresh_group, "refresh_all", "Refresh All Browser Sources (All Scenes)", on_click_refresh_all)

    local auto_group = obs.obs_properties_create()
    obs.obs_properties_add_group(props, "auto_refresh_group", "Auto-Refresh Settings", obs.OBS_GROUP_NORMAL, auto_group)
    obs.obs_properties_add_bool(auto_group, "auto_refresh", "Enable Auto-Refresh")
    local interval = obs.obs_properties_add_int(auto_group, "refresh_interval", "Interval (seconds)", 10, 3600, 10)
    obs.obs_property_int_set_suffix(interval, " seconds")

    local hotkey_group = obs.obs_properties_create()
    obs.obs_properties_add_group(props, "hotkey_group", "Hotkey Info", obs.OBS_GROUP_NORMAL, hotkey_group)
    obs.obs_properties_add_text(hotkey_group, "hotkey_info", 
    "You can set up hotkeys for browser refresh in OBS Settings -> Hotkeys.\n" ..
    "Look for 'Refresh Current Scene Browser Sources' and 'Refresh All Browser Sources'.", 
    obs.OBS_TEXT_INFO)
    return props
end

function script_defaults(settings)
    obs.obs_data_set_default_int(settings, "refresh_interval", 300)
    obs.obs_data_set_default_bool(settings, "auto_refresh", false)
end

function script_update(settings)
    refresh_interval = obs.obs_data_get_int(settings, "refresh_interval")
    local new_auto = obs.obs_data_get_bool(settings, "auto_refresh")

    if new_auto ~= auto_refresh_enabled then
        auto_refresh_enabled = new_auto
        if auto_refresh_enabled then
            setup_refresh_timer()
        else
            remove_refresh_timer()
        end
    elseif auto_refresh_enabled and refresh_timer ~= nil then
        obs.timer_remove(refresh_timer)
        setup_refresh_timer()
    end
end

function setup_refresh_timer()
    remove_refresh_timer()
    refresh_timer = function()
        if not is_refreshing then
            refresh_all_sources()
        end
    end
    obs.timer_add(refresh_timer, refresh_interval * 1000)
    print("Auto-refresh enabled. Interval: " .. refresh_interval .. " seconds.")
end

function remove_refresh_timer()
    if refresh_timer ~= nil then
        obs.timer_remove(refresh_timer)
        refresh_timer = nil
        print("Auto-refresh disabled.")
    end
end

function is_browser_source(source)
    return source ~= nil and obs.obs_source_get_unversioned_id(source) == "browser_source"
end

function process_scene_sources(scene, browser_sources)
    if scene == nil then return end
    local items = obs.obs_scene_enum_items(scene)
    if items == nil then return end

    for _, item in ipairs(items) do
        local source = obs.obs_sceneitem_get_source(item)
        if is_browser_source(source) then
            table.insert(browser_sources, source)
        end

        local id = obs.obs_source_get_unversioned_id(source)
        if id == "group" then
            process_scene_sources(obs.obs_group_from_source(source), browser_sources)
        elseif id == "scene" then
            process_scene_sources(obs.obs_scene_from_source(source), browser_sources)
        end
    end

    obs.sceneitem_list_release(items)
end

function refresh_browser_source(source)
    local name = obs.obs_source_get_name(source)
    local settings = obs.obs_source_get_settings(source)
    local url = obs.obs_data_get_string(settings, "url")
    local is_local = obs.obs_data_get_bool(settings, "is_local_file")

    if not is_local and url and url ~= "" then
        -- Cache-busting soft refresh
        local cb_url = url
        local timestamp = tostring(os.time())
        if not string.find(url, "?") then
            cb_url = url .. "?cb=" .. timestamp
        else
            cb_url = url .. "&cb=" .. timestamp
        end

        obs.obs_data_set_string(settings, "url", cb_url)
        obs.obs_source_update(source, settings)
        print("Soft (cache-busted) refreshed: " .. name)
    else
        -- Hard refresh for local files or blank URL
        obs.obs_data_set_bool(settings, "shutdown", true)
        obs.obs_source_update(source, settings)

        obs.timer_add(function()
            local s = obs.obs_source_get_settings(source)
            obs.obs_data_set_bool(s, "shutdown", false)
            obs.obs_source_update(source, s)
            obs.obs_data_release(s)
        end, 100)

        print("Hard refreshed: " .. name)
    end

    obs.obs_data_release(settings)
end

function refresh_sources_sequentially(source_list)
    local i = 1
    local function refresh_next()
        if i <= #source_list then
            refresh_browser_source(source_list[i])
            i = i + 1
        else
            obs.timer_remove(refresh_next)
            is_refreshing = false
        end
    end

    is_refreshing = true
    obs.timer_add(refresh_next, refresh_delay_ms)
end

function refresh_current_scene_sources()
    if is_refreshing then return end
    local list = {}

    local front = obs.obs_frontend_get_current_scene()
    if front then
        local scene = obs.obs_scene_from_source(front)
        process_scene_sources(scene, list)
        obs.obs_source_release(front)
    end

    print("Refreshing " .. #list .. " browser sources in current scene...")
    refresh_sources_sequentially(list)
end

function refresh_all_sources()
    if is_refreshing then return end
    local all_sources = {}
    local sources = obs.obs_enum_sources()
    if sources then
        for _, src in ipairs(sources) do
            if is_browser_source(src) then
                table.insert(all_sources, src)
            end
        end
        obs.source_list_release(sources)
    end

    print("Refreshing " .. #all_sources .. " browser sources across all scenes...")
    refresh_sources_sequentially(all_sources)
end

function on_click_refresh_current(props, prop)
    refresh_current_scene_sources()
    return true
end

function on_click_refresh_all(props, prop)
    refresh_all_sources()
    return true
end

function script_load(settings)
    hotkey_id_current = obs.obs_hotkey_register_frontend("refresh_current_browser_sources_hotkey", "Refresh Current Scene Browser Sources", refresh_current_scene_sources)
    hotkey_id_all = obs.obs_hotkey_register_frontend("refresh_all_browser_sources_hotkey", "Refresh All Browser Sources", refresh_all_sources)

    local key_current = obs.obs_data_get_array(settings, "refresh_current_hotkey")
    local key_all = obs.obs_data_get_array(settings, "refresh_all_hotkey")
    obs.obs_hotkey_load(hotkey_id_current, key_current)
    obs.obs_hotkey_load(hotkey_id_all, key_all)
    obs.obs_data_array_release(key_current)
    obs.obs_data_array_release(key_all)

    auto_refresh_enabled = obs.obs_data_get_bool(settings, "auto_refresh")
    refresh_interval = obs.obs_data_get_int(settings, "refresh_interval")
    if auto_refresh_enabled then
        setup_refresh_timer()
    end

    print("RearSilver's Browser Refresh loaded!")
end

function script_save(settings)
    local key_current = obs.obs_hotkey_save(hotkey_id_current)
    local key_all = obs.obs_hotkey_save(hotkey_id_all)
    obs.obs_data_set_array(settings, "refresh_current_hotkey", key_current)
    obs.obs_data_set_array(settings, "refresh_all_hotkey", key_all)
    obs.obs_data_array_release(key_current)
    obs.obs_data_array_release(key_all)

    obs.obs_data_set_bool(settings, "auto_refresh", auto_refresh_enabled)
    obs.obs_data_set_int(settings, "refresh_interval", refresh_interval)
end

function script_unload()
    remove_refresh_timer()
end
