obs = obslua

-- Globals
mic_source_name = ""
text_source_name = ""
mic_source = nil
text_source = nil
last_mute_state = nil

function script_description()
    return [[
<b>RearSilver's Mighty Muted Reminder</b>
<p>Copyright &copy; 2025 <a style="color: #ffffff; text-decoration: none;"
        >RearSilver</a>
<hr>
What's a streamer's biggest embarrassing moment? Not noticing you've been chatting away to yourself while muted! 🎙️😬

Never again with <b>RearSilver's Mighty Muted Reminder</b>! <br/> 
This script displays a GDI text source when your selected mic input is muted, and hides it when unmuted.  
So you'll *always* know when your audience can (and can't) hear your... *ahem*... golden commentary. 🐾

<ul>
    <li>Use whatever text you want to display while muted</li>
    <li>Works across all scenes of your choosing by simply having the text source in your scene</li>
    <li>Once you're done it's a case of set it and forget it</li>
    <li>You completely control all styling in the text source properties</li>
    <li>In case you couldn't guess, i made this script because I've chatted away to myself numerous times</li>
</ul>
<p>Created by RearSilver. If you find this useful, please drop me a follow and join my streams at
<br>
<a href="https://twitch.tv/rearsilver">https://twitch.tv/rearsilver</a>!</p>
]]
end

function script_defaults(settings)
    -- Default mic source name and text source name
    obs.obs_data_set_default_string(settings, "mic_source", "")
    obs.obs_data_set_default_string(settings, "text_source", "")
end

function script_properties()
    local props = obs.obs_properties_create()

    -- Mic source dropdown
    local source_list = obs.obs_properties_add_list(props, "mic_source", "Select Your Microphone",
        obs.OBS_COMBO_TYPE_LIST, obs.OBS_COMBO_FORMAT_STRING)
    local sources = obs.obs_enum_sources()
    if sources then
        for _, source in ipairs(sources) do
            local source_id = obs.obs_source_get_id(source)
            if source_id and (source_id:find("input") or source_id:find("wasapi_input") or source_id:find("pulse_input")) then
                local name = obs.obs_source_get_name(source)
                obs.obs_property_list_add_string(source_list, name, name)
            end
        end
        obs.source_list_release(sources)
    end

    -- GDI Text source input
    obs.obs_properties_add_text(props, "text_source", "Enter GDI Text Source Name", obs.OBS_TEXT_DEFAULT)

                    -- Configuration Instructions
                    obs.obs_properties_add_text(props, "instructions", [[
                        <b>RearSilver's Mighty Muted Reminder - Instructions</b><br/><br/>
    
                        <b>1.</b> Create a "Text (GDI+)" source in the OBS scene(s) where you want the mute indicator to appear.<br/><br/>
    
                        <b>2.</b>  In the script's properties above, <b>select your microphone input</b> from the dropdown list.<br/><br/>
    
                        <b>3.</b>  In the script's properties, <b>enter the exact, case-sensitive name</b> of the "Text (GDI+)" source you created in step 1.<br/>
    
                        (You can find the source name in the "Sources" dock of OBS).<br/><br/>
    
                        <b>4.</b>  Copy and paste the GDI text source into your scene(s) where you want the mute indicator to appear.<br/><br/>
    
                        <b>5.</b>  The script will automatically show the text source when your selected microphone is muted and hide it when unmuted.
    
                        <hr/>
                        For support or feedback, please visit <a style="color: #ffffff; text-decoration: none;" href="https://twitch.tv/rearsilver">twitch.tv/rearsilver</a>.
                    ]], obs.OBS_TEXT_INFO)

    return props
end

function script_update(settings)
    mic_source_name = obs.obs_data_get_string(settings, "mic_source")
    text_source_name = obs.obs_data_get_string(settings, "text_source")

    -- Get the mic source object
    mic_source = obs.obs_get_source_by_name(mic_source_name)

    -- Initial check on the mute state
    if mic_source then
        last_mute_state = obs.obs_source_muted(mic_source)
        update_text_source_visibility()
    end
end

function script_tick()
    -- If the mic source has been updated and mute state has changed, toggle the visibility
    if mic_source then
        local is_muted = obs.obs_source_muted(mic_source)
        if is_muted ~= last_mute_state then
            last_mute_state = is_muted
            update_text_source_visibility()
        end
    end
end

function update_text_source_visibility()
    -- Get the current scene
    local current_scene = obs.obs_frontend_get_current_scene()
    if current_scene then
        -- Find the GDI text source in the current scene
        local scene = obs.obs_scene_from_source(current_scene)
        local scene_item = obs.obs_scene_find_source(scene, text_source_name)

        if scene_item then
            -- Toggle visibility based on mute state
            if last_mute_state then
                obs.obs_sceneitem_set_visible(scene_item, true)  -- Show it if muted
            else
                obs.obs_sceneitem_set_visible(scene_item, false) -- Hide it if unmuted
            end
        else
            obs.script_log(obs.LOG_WARNING, "Text source '" .. text_source_name .. "' not found in the current scene.")
        end
        obs.obs_scene_release(scene)
    end
end

function script_unload()
    -- Cleanup the mic source when the script is unloaded
    if mic_source then
        obs.obs_source_release(mic_source)
    end
end