obs = obslua

localSettings = nil
auto_launch_enabled = false
run_all_admin = false
launch_hotkey_id = nil
close_hotkey_id = nil
----------------------------------------------------------

-- Function for launching programs
function launch_func(run_as_admin)
    local execPaths = obs.obs_data_get_array(localSettings, 'execPaths')
    local count = obs.obs_data_array_count(execPaths)

    obs.script_log(obs.LOG_INFO, "--- launch_func CALLED (Admin: " .. tostring(run_as_admin) .. ") ---")

    for i = 0, count - 1 do
        local item = obs.obs_data_array_item(execPaths, i)
        local execPath = obs.obs_data_get_string(item, "value")

        obs.script_log(obs.LOG_INFO, "Attempting to launch program " .. (i + 1) .. "/" .. count .. ": " .. execPath)

        execPath = execPath:gsub("/", "\\")

        if execPath == '' then
            obs.script_log(obs.LOG_ERROR, "Invalid executable path at index " .. i .. ".")
            return nil
        end

        local cmd = 'start "" '
        if run_as_admin then
            obs.script_log(obs.LOG_WARNING, "Attempting to launch '" .. execPath .. "' as administrator (may show UAC prompt).")
            cmd = cmd .. '/high /separate "cmd /c "' .. execPath .. '"'
        else
            cmd = cmd .. '/b /high /separate "' .. execPath .. '"'
        end

        obs.script_log(obs.LOG_INFO, "Executing launch command: " .. cmd)
        os.execute(cmd)
    end

    obs.obs_data_array_release(execPaths)
    obs.script_log(obs.LOG_INFO, "Program launch completed.")
end

-- Function for closing all launched programs
function close_func()
    local execPaths = obs.obs_data_get_array(localSettings, 'execPaths')
    local count = obs.obs_data_array_count(execPaths)

    obs.script_log(obs.LOG_INFO, "--- close_func CALLED ---")

    for i = 0, count - 1 do
        local item = obs.obs_data_array_item(execPaths, i)
        local execPath = obs.obs_data_get_string(item, "value")

        obs.script_log(obs.LOG_INFO, "Attempting to close program " .. (i + 1) .. "/" .. count .. ": " .. execPath)

        execPath = execPath:gsub("/", "\\")

        if execPath == '' then
            obs.script_log(obs.LOG_ERROR, "Invalid executable path at index " .. i .. ".")
            return nil
        end

        local index = execPath:match'^.*()\\'
        local execName = execPath:sub(index + 1)
        local cmd = 'taskkill /IM "' .. execName .. '" /F'

        obs.script_log(obs.LOG_INFO, "Executing close command: " .. cmd)
        os.execute(cmd)
    end

    obs.obs_data_array_release(execPaths)
    obs.script_log(obs.LOG_INFO, "Program closing completed.")
end

-- Button click handler for Launch Now
function on_button_click_launch(props, prop)
    obs.script_log(obs.LOG_INFO, "Launch Now button clicked.")
    launch_func(run_all_admin)
end

-- Button click handler for Close Now
function on_button_click_close(props, prop)
    obs.script_log(obs.LOG_INFO, "Close Now button clicked.")
    close_func()
end

-- Hotkey callback for Launch Now
local function hotkey_callback_launch(pressed)
    if pressed then
        obs.script_log(obs.LOG_INFO, "Launch Now hotkey pressed.")
        launch_func(run_all_admin)
    end
end

-- Hotkey callback for Close Now
local function hotkey_callback_close(pressed)
    if pressed then
        obs.script_log(obs.LOG_INFO, "Close Now hotkey pressed.")
        close_func()
    end
end

-- Function to check if auto-launch is enabled and launch programs on OBS start
function on_observer_load()
    if auto_launch_enabled then
        obs.script_log(obs.LOG_INFO, "Auto-launch on OBS start is enabled.")
        launch_func(run_all_admin)
    else
        obs.script_log(obs.LOG_INFO, "Auto-launch on OBS start is disabled.")
    end
end

-- Script properties to define user settings and buttons
function script_properties()
    local props = obs.obs_properties_create()

    -- Add editable list for program paths
    obs.obs_properties_add_editable_list(props, "execPaths", "Program Executables", obs.OBS_EDITABLE_LIST_TYPE_FILES, "*.*", nil)

    -- Single checkbox to toggle auto-launch on OBS start
    obs.obs_properties_add_bool(props, "auto_launch", "Launch on OBS Start")

    -- New checkbox for global Run as Administrator
    obs.obs_properties_add_bool(props, "run_as_admin", "Run All Programs as Administrator")

      -- Manual launch and close buttons (added directly to props, one after the other)
  obs.obs_properties_add_button(props, "launch_button", "Launch Now", on_button_click_launch)  
  obs.obs_properties_add_button(props, "close_button", "Close Now", on_button_click_close)

    -- Hotkey Info Group (moved below the main options)
    local hotkey_group = obs.obs_properties_create()
    obs.obs_properties_add_group(props, "hotkey_group", "Hotkey Setup", obs.OBS_GROUP_NORMAL, hotkey_group)
    obs.obs_properties_add_text(hotkey_group, "hotkey_info",
        "In OBS, go to Settings -> Hotkeys.\n" ..
        "Look for 'Launch Programs (RearSilver's Auto Start)' and set the 'Launch Now' hotkey to your desired combination. \n" ..
        "Look for 'Close Programs (RearSilver's Auto Start)' and set the 'Close Now' hotkey to your desired combination.",
        obs.OBS_TEXT_INFO)


        -- Configuration Instructions
        obs.obs_properties_add_text(props, "instructions", [[
            <b>RearSilver's Auto Program Launcher - Instructions</b><br/><br/>
            1. <b>Program Executables:</b> Use the "Add (+)" button to select the executable files (.exe on Windows) of the programs you want to launch and close with OBS. Use the "Remove (-)" button to delete entries.<br/><br/>
            2. <b>Launch on OBS Start:</b> Check this box if you want the listed programs to launch automatically when OBS Studio starts.<br/><br/>
            3. <b>Run All Programs as Administrator:</b> Check this box if you want all the listed programs to attempt to run with administrator privileges. Note that this might trigger User Account Control (UAC) prompts if OBS itself is not running as administrator.<br/><br/>
            4. <b>Hotkey Settings:</b> To set up hotkeys for launching and closing the programs manually, go to OBS Studio's <b>Settings -> Hotkeys</b>. Look for the actions named "Launch Programs (RearSilver Auto Start)" and "Close Programs (RearSilver Auto Start)". Assign your desired hotkey combinations to these actions.<br/><br/>
            5. <b>Launch Now / Close Now:</b> Use these buttons to manually trigger the launch or closure of all the listed programs at any time.<br/><br/>
            <hr/>
            For support or feedback, please visit <a style="color: #ffffff; text-decoration: none;" href="https://twitch.tv/rearsilver">twitch.tv/rearsilver</a>.
        ]], obs.OBS_TEXT_INFO)
    return props
end

-- Called on script load
function script_load(settings)
    localSettings = settings
    auto_launch_enabled = obs.obs_data_get_bool(settings, "auto_launch")
    run_all_admin = obs.obs_data_get_bool(settings, "run_as_admin")
    obs.script_log(obs.LOG_INFO, "--- Script Loaded ---")
    obs.script_log(obs.LOG_INFO, "Auto-launch on OBS Start: " .. tostring(auto_launch_enabled))
    obs.script_log(obs.LOG_INFO, "Run All Programs as Administrator: " .. tostring(run_all_admin))

    -- Register hotkeys
    launch_hotkey_id = obs.obs_hotkey_register_frontend("launch_programs_rearsilver_auto_start", "Launch Programs (RearSilver Auto Start)", hotkey_callback_launch)
    close_hotkey_id = obs.obs_hotkey_register_frontend("close_programs_rearsilver_auto_start", "Close Programs (RearSilver Auto Start)", hotkey_callback_close)
    obs.script_log(obs.LOG_INFO, "Hotkeys registered.")

    -- Load saved hotkey bindings
    local launch_hotkey_data = obs.obs_data_get_array(settings, "launch_programs_hotkey")
    if launch_hotkey_data then
        obs.obs_hotkey_load(launch_hotkey_id, launch_hotkey_data)
        obs.obs_data_array_release(launch_hotkey_data)
        obs.script_log(obs.LOG_INFO, "Launch hotkey binding loaded.")
    else
        obs.script_log(obs.LOG_INFO, "No saved binding for launch hotkey.")
    end

    local close_hotkey_data = obs.obs_data_get_array(settings, "close_programs_hotkey")
    if close_hotkey_data then
        obs.obs_hotkey_load(close_hotkey_id, close_hotkey_data)
        obs.obs_data_array_release(close_hotkey_data)
        obs.script_log(obs.LOG_INFO, "Close hotkey binding loaded.")
    else
        obs.script_log(obs.LOG_INFO, "No saved binding for close hotkey.")
    end

    -- Auto-launch programs if enabled
    on_observer_load()
end

-- Called to update settings
function script_update(settings)
    localSettings = settings
    local new_auto_launch = obs.obs_data_get_bool(settings, "auto_launch")
    local new_run_all_admin = obs.obs_data_get_bool(settings, "run_as_admin")
    obs.script_log(obs.LOG_INFO, "--- Script Settings Updated ---")
    obs.script_log(obs.LOG_INFO, "Auto-launch on OBS Start: " .. tostring(new_auto_launch) .. " (Previous: " .. tostring(auto_launch_enabled) .. ")")
    obs.script_log(obs.LOG_INFO, "Run All Programs as Administrator: " .. tostring(new_run_all_admin) .. " (Previous: " .. tostring(run_all_admin) .. ")")
    auto_launch_enabled = new_auto_launch
    run_all_admin = new_run_all_admin
end

-- Called when the script is saved
function script_save(settings)
    obs.obs_data_set_bool(settings, "auto_launch", auto_launch_enabled)
    obs.obs_data_set_bool(settings, "run_as_admin", run_all_admin)
    obs.script_log(obs.LOG_INFO, "--- Script Settings Saved ---")
    obs.script_log(obs.LOG_INFO, "Auto-launch on OBS Start: " .. tostring(auto_launch_enabled))
    obs.script_log(obs.LOG_INFO, "Run All Programs as Administrator: " .. tostring(run_all_admin))

    -- Save hotkey bindings
    local launch_hotkey_data = obs.obs_hotkey_save(launch_hotkey_id)
    obs.obs_data_set_array(settings, "launch_programs_hotkey", launch_hotkey_data)
    obs.obs_data_array_release(launch_hotkey_data)
    obs.script_log(obs.LOG_INFO, "Launch hotkey binding saved.")

    local close_hotkey_data = obs.obs_hotkey_save(close_hotkey_id)
    obs.obs_data_set_array(settings, "close_programs_hotkey", close_hotkey_data)
    obs.obs_data_array_release(close_hotkey_data)
    obs.script_log(obs.LOG_INFO, "Close hotkey binding saved.")

    obs.obs_data_set_array(settings, "execPaths", localSettings)
    obs.script_log(obs.LOG_INFO, "Program executables list saved.")
end

-- Return the script description
function script_description()
    return [[
<b>RearSilver's Auto Program Launcher</b>
<p>Copyright &copy; 2025 <a style="color: #ffffff; text-decoration: none;">RearSilver</a>
<hr>
<p>Automatically launch and close your favourite stream setup programs when OBS starts and exits. Start your entire stream toolkit (chatbots, music players, lighting controllers, etc.) with one hotkey or as soon as OBS launches.</p>

<b>What This Script Does:</b>
<ul>
    <li>Lets you add multiple programs to be auto-launched when OBS opens.</li>
    <li>Closes them all gracefully when OBS exits.</li>
    <li>Includes "Launch Now" and "Close Now" buttons for manual control.</li>
    <li>Option to launch all programs as administrator.</li>
    <li>Option for automatic launch on OBS start.</li>
    <li>Hotkey options for manual launch and close.</li>
    <li>Configuration automatically saves between sessions.</li>
</ul>


<p>Created by RearSilver. If you find this useful, please drop me a follow and join my streams at
<br>
<a href="https://twitch.tv/rearsilver">https://twitch.tv/rearsilver</a>!</p>
    ]]
end