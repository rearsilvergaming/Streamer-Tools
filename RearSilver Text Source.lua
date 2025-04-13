obs = obslua
luahotkey_id_create = obslua.OBS_INVALID_HOTKEY_ID
hotkey_id_delete = obslua.OBS_INVALID_HOTKEY_ID
global_settings = nil
last_created_source_name = nil
source_prefix = "QuickText"
local bit = require("bit")

function script_description()
    return [[
<b>RearSilver's Quick Text Source Maker</b>
<p>Copyright &copy; 2025 <a style="color: #ffffff; text-decoration: none;"
        >RearSilver</a>
<hr>
<p>Quickly drop temporary text overlays into your current scene using customisable hotkeys. Ideal for live reactions, on-stream notes, audience callouts, or improv commentary.</p>
<b>Features:</b>
<ul>
    <li>Adds a stylised text source instantly via hotkey</li>
    <li>Automatically stacks multiple entries</li>
    <li>Easily removes the most recent entry with another hotkey</li>
    <li>Set your hotkeys under Settings > Hotkeys.</li>
    <li>Perfect for streamers who want fast, flexible text overlays with minimal fuss!</li>
</ul>
<p>Created by RearSilver. If you find this useful, please drop me a follow and join my streams at
<br>
<a href="https://twitch.tv/rearsilver">https://twitch.tv/rearsilver</a>!</p>

<h4>⚠️Justification warning⚠️</h4>
     <p>For multi-line text, OBS lacks built-in justification (left, center, right). Text will be left-aligned.
     <br>
    <strong>Pro-Tip:</strong> Use multiple text sources for individual alignment.</p>
 
]]
end



function script_properties()
      local props = obslua.obs_properties_create()
       
       -- Text content
       obslua.obs_properties_add_text(props, "text", "Text Content", obslua.OBS_TEXT_MULTILINE)

   
     
   -- Source naming
       obslua.obs_properties_add_text(props, "source_name_base", "Base Source Name", obslua.OBS_TEXT_DEFAULT)
       
       -- Creation mode
       local mode_list = obslua.obs_properties_add_list(props, "creation_mode", "Creation Mode", obslua.OBS_COMBO_TYPE_LIST, obslua.OBS_COMBO_FORMAT_STRING)
       obslua.obs_property_list_add_string(mode_list, "Create New Source", "create_new")
       obslua.obs_property_list_add_string(mode_list, "Update Last Source", "update_last")
       -- Font and color settings
       obslua.obs_properties_add_font(props, "font", "Font")
       obslua.obs_properties_add_color(props, "color", "Text Color")
       local p = obslua.obs_properties_add_int_slider(props, "opacity", "Text Opacity", 0, 100, 1)
       obslua.obs_property_int_set_suffix(p, "%")
       
       -- Background settings
       obslua.obs_properties_add_color(props, "bk_color", "Background Color")
       p = obslua.obs_properties_add_int_slider(props, "bk_opacity", "Background Opacity", 0, 100, 1)
       obslua.obs_property_int_set_suffix(p, "%")
       
       -- -- Outline settings
      local outline = obslua.obs_properties_create()
        obslua.obs_properties_add_int(outline, "outline_size", "Size", 0, 50, 1)
        obslua.obs_properties_add_color(outline, "outline_color", "Color")
        p = obslua.obs_properties_add_float_slider(outline, "outline_opacity", "Opacity", 0.0, 1.0, 0.01)
        obslua.obs_properties_add_group(props, "outline_group", "Outline", obslua.OBS_GROUP_CHECKABLE, outline)
       
       -- Text extents settings
       local extents = obslua.obs_properties_create()
        obslua.obs_properties_add_int(extents, "extents_cx", "Width", 50, 2000, 1)
        obslua.obs_properties_add_int(extents, "extents_cy", "Height", 50, 2000, 1)
        obslua.obs_properties_add_bool(extents, "extents_wrap", "Word Wrap")
        obslua.obs_properties_add_group(props, "extents_group", "Custom Text Bounds", obslua.OBS_GROUP_CHECKABLE, extents)
       
       -- Alignment settings
       local align = obslua.obs_properties_add_list(props, "align", "Horizontal Align", obslua.OBS_COMBO_TYPE_LIST, obslua.OBS_COMBO_FORMAT_STRING)
       obslua.obs_property_list_add_string(align, "Left", "left")
       obslua.obs_property_list_add_string(align, "Center", "center")
       obslua.obs_property_list_add_string(align, "Right", "right")
       
       local valign = obslua.obs_properties_add_list(props, "valign", "Vertical Align", obslua.OBS_COMBO_TYPE_LIST, obslua.OBS_COMBO_FORMAT_STRING)
       obslua.obs_property_list_add_string(valign, "Top", "top")
       obslua.obs_property_list_add_string(valign, "Center", "center")
       obslua.obs_property_list_add_string(valign, "Bottom", "bottom")
       
       -- Timer settings
       local timer = obslua.obs_properties_create()
       obslua.obs_properties_add_int(timer, "timer_duration", "Duration (seconds)", 1, 300, 1)
       obslua.obs_properties_add_group(props, "timer_settings", "Auto-hide Timer", obslua.OBS_GROUP_CHECKABLE, timer)
       
       -- Apply button
       obslua.obs_properties_add_button(props, "apply", "Apply Text", on_click_apply)

 -- Hotkey Group
 local hotkey_group = obs.obs_properties_create()
 obs.obs_properties_add_group(props, "hotkey_group", "Hotkey Info", obs.OBS_GROUP_NORMAL, hotkey_group)

 -- Combined hotkey help text as a single string
 local hotkey_help_text =
     "Assign Hotkeys for the Actions.\n" ..
     "\n" ..
     "In OBS, go to File > Settings.\n" ..
     "Select the 'Hotkeys' tab from the left sidebar.\n" ..
     "\n" ..
     "Scroll down to find:\n" ..
     "- 'Drop Text Source (RearSilver)'\n" ..
     "- 'Delete Last Text Source (RearSilver)'\n" ..
     "\n" ..
     "Assign a key or key combo for each:\n" ..
     "- Example: Ctrl+Shift+T to add a text source.\n" ..
     "- Example: Ctrl+Shift+D to delete the last one.\n" ..
     "\n" ..
     "How to Use Your Hotkeys:\n" ..
     "- Press your 'Drop Text Source' hotkey to add a new text source to your current scene.\n" ..
     "- Press your 'Delete Last Text Source' hotkey to remove the most recently added one."

 obs.obs_properties_add_text(hotkey_group, "hotkey_info", hotkey_help_text, obs.OBS_TEXT_INFO)

       
       return props
      end

      function script_defaults(settings)
        local font = obslua.obs_data_create()
        obslua.obs_data_set_default_string(font, "face", "Arial")
        obslua.obs_data_set_default_int(font, "size", 120)
        obslua.obs_data_set_default_int(settings, "opacity", 100)
        obslua.obs_data_set_default_int(settings, "bk_opacity", 0)
        obslua.obs_data_set_default_obj(settings, "font", font)
        obslua.obs_data_release(font)
    
        obslua.obs_data_set_default_string(settings, "source_name_base", "QuickText")
        obslua.obs_data_set_default_string(settings, "text", "") -- Changed default to empty string
        obslua.obs_data_set_default_int(settings, "color", 0xFFFFFF)  -- Default color white
        obslua.obs_data_set_default_int(settings, "opacity", 100)
        obslua.obs_data_set_default_int(settings, "bk_color", 0x000000)  -- Default background color black
        obslua.obs_data_set_default_int(settings, "bk_opacity", 0)
        obslua.obs_data_set_default_string(settings, "align", "center")
        obslua.obs_data_set_default_string(settings, "valign", "center")
        obslua.obs_data_set_default_bool(settings, "extents_group", true)
        obslua.obs_data_set_default_bool(settings, "extents_wrap", true)
        obslua.obs_data_set_default_int(settings, "extents_cx", 400)
        obslua.obs_data_set_default_int(settings, "extents_cy", 200)
        obslua.obs_data_set_default_bool(settings, "outline_group", false)
        obslua.obs_data_set_default_int(settings, "outline_size", 2)
        obslua.obs_data_set_default_int(settings, "outline_color", 0xFFFFFF)
        obslua.obs_data_set_default_int(settings, "outline_opacity", 100)
        obslua.obs_data_set_default_string(settings, "creation_mode", "create_new")
        obslua.obs_data_set_default_bool(settings, "timer_settings", false)
        obslua.obs_data_set_default_int(settings, "timer_duration", 10)
    end
    
    function apply_text()
        local settings = obslua.obs_data_create_from_json(obslua.obs_data_get_json(global_settings))
        local name_base = obslua.obs_data_get_string(settings, "source_name_base")
    
        if name_base == nil or name_base == "" then
            name_base = "QuickText"
            print("[RearSilver Text Source.lua] Source name base was empty, using default: 'QuickText'")
        end
    
        local name = name_base
        local creation_mode = obslua.obs_data_get_string(settings, "creation_mode")
        local source = nil
    
        -- Ensure the text content is retrieved correctly from the input field
        local text_content = obslua.obs_data_get_string(settings, "text")
        if text_content == nil or text_content == "" then
            text_content = "BRB"  -- Default text content if the field is empty
            print("[RearSilver Text Source.lua] Text content was empty, using default: 'BRB'")
        else
            print("[RearSilver Text Source.lua] Text content from field: '" .. text_content .. "'")
        end
    
        print("[RearSilver Text Source.lua] Source name base: '" .. name_base .. "'")
    
        -- Text color with opacity
        local color_rgb = obslua.obs_data_get_int(settings, "color") or 0xFFFFFF
        local opacity_percent = obslua.obs_data_get_int(settings, "opacity") or 100
        local alpha_hex = string.format("%02X", math.floor(opacity_percent * 2.55))
        local color_hex = string.format("%06X", color_rgb)
        local final_color_hex = "0x" .. alpha_hex .. color_hex
        local final_color = tonumber(final_color_hex)
    
        print("Color (RGB):", color_rgb)
        print("Alpha (Hex):", alpha_hex)
        print("Final Color (Hex with Alpha):", final_color_hex)
        print("Final Color (Integer with Alpha):", final_color)
    
        -- Background color with opacity
        local bk_color = obslua.obs_data_get_int(settings, "bk_color") or 0x000000
        local bk_opacity_percent = obslua.obs_data_get_int(settings, "bk_opacity") or 0
        local bk_alpha = math.floor(bk_opacity_percent * 2.55)
        if bk_alpha == 0 then bk_alpha = 255 end  -- Ensure full opacity for background if 0
        local final_bk_color = bit.bor(bit.lshift(bk_alpha, 24), bk_color)
        print("[RearSilver Text Source.lua] DEBUG: Final Background Color with Alpha = " .. string.format("0x%08X", final_bk_color))
    
        -- Font settings
        local font = obslua.obs_data_get_obj(settings, "font")
        local source_settings = obslua.obs_data_create()
        
        -- Set all the source settings
        obslua.obs_data_set_string(source_settings, "text", text_content)
        obslua.obs_data_set_int(source_settings, "color", final_color)
        obslua.obs_data_set_int(source_settings, "bk_color", final_bk_color)
        
        if font ~= nil then
            obslua.obs_data_set_obj(source_settings, "font", font)
            obslua.obs_data_release(font)
        else
            local default_font = obslua.obs_data_create()
            obslua.obs_data_set_string(default_font, "face", "Arial")
            obslua.obs_data_set_int(default_font, "size", 120)
            obslua.obs_data_set_obj(source_settings, "font", default_font)
            obslua.obs_data_release(default_font)
        end
    
        -- Additional settings
        obslua.obs_data_set_string(source_settings, "align", obslua.obs_data_get_string(settings, "align"))
        obslua.obs_data_set_string(source_settings, "valign", obslua.obs_data_get_string(settings, "valign"))
    
        -- Extents settings
        local use_extents = obslua.obs_data_get_bool(settings, "extents_group")
        obslua.obs_data_set_bool(source_settings, "extents", use_extents)
        if use_extents then
            obslua.obs_data_set_int(source_settings, "cx", obslua.obs_data_get_int(settings, "extents_cx"))
            obslua.obs_data_set_int(source_settings, "cy", obslua.obs_data_get_int(settings, "extents_cy"))
            obslua.obs_data_set_bool(source_settings, "wrap", obslua.obs_data_get_bool(settings, "extents_wrap"))
        end
    
        -- Source creation or update
        if creation_mode == "create_new" then
            local count = 1
            while obslua.obs_get_source_by_name(name) ~= nil do
                name = name_base .. " " .. tostring(count)
                count = count + 1
            end
            local id = package.config:sub(1,1) == "\\" and "text_gdiplus" or "text_ft2_source"
            source = obslua.obs_source_create(id, name, source_settings, nil)
            last_created_source_name = name
            print("[RearSilver Text Source.lua] Created new source with name: '" .. name .. "'")
        elseif creation_mode == "update_last" and last_created_source_name ~= nil then
            source = obslua.obs_get_source_by_name(last_created_source_name)
            if source ~= nil then
                obslua.obs_source_update(source, source_settings)
                print("[RearSilver Text Source.lua] Updated existing source: '" .. last_created_source_name .. "'")
            else
                local id = package.config:sub(1,1) == "\\" and "text_gdiplus" or "text_ft2_source"
                source = obslua.obs_source_create(id, name_base, source_settings, nil)
                last_created_source_name = name_base
                print("[RearSilver Text Source.lua] Last source not found, creating new one with name: '" .. name_base .. "'")
            end
        else
            local id = package.config:sub(1,1) == "\\" and "text_gdiplus" or "text_ft2_source"
            source = obslua.obs_source_create(id, name_base, source_settings, nil)
            last_created_source_name = name_base
            print("[RearSilver Text Source.lua] Creating new source with name: '" .. name_base .. "'")
        end
    
        obslua.obs_data_release(source_settings)
    
        if source ~= nil then
            local scene_source = obslua.obs_frontend_get_current_scene()
            local scene = obslua.obs_scene_from_source(scene_source)
            local item = obslua.obs_scene_find_source(scene, obslua.obs_source_get_name(source))
    
            if item == nil then
                item = obslua.obs_scene_add(scene, source)
            end
            
            -- Get the rendered text extents
            local text_width = obslua.obs_source_get_width(source)
            local text_height = obslua.obs_source_get_height(source)
            local scene_width = obslua.obs_source_get_width(scene_source)
            local scene_height = obslua.obs_source_get_height(scene_source)
            
            local pos = obslua.vec2()
            pos.x = (scene_width - text_width) / 2
            pos.y = (scene_height - text_height) / 2
            obslua.obs_sceneitem_set_pos(item, pos)
            obslua.obs_sceneitem_set_alignment(item, 0) -- Reset alignment after setting position
    
            obslua.obs_source_release(scene_source)
            obslua.obs_source_release(source)
    
            local use_timer = obslua.obs_data_get_bool(global_settings, "timer_settings")
            if use_timer then
                local duration = obslua.obs_data_get_int(global_settings, "timer_duration")
                obslua.timer_add(function()
                    local scene_source_remove = obslua.obs_frontend_get_current_scene()
                    local scene_remove = obslua.obs_scene_from_source(scene_source_remove)
                    local item_remove = obslua.obs_scene_find_source(scene_remove, last_created_source_name)
                    if item_remove ~= nil then
                        obslua.obs_sceneitem_remove(item_remove)
                    end
                    obslua.obs_source_release(scene_source_remove)
                    return false
                end, duration * 1000)
            end
        end
    
        -- No need to release global_settings as it's a persistent object
    end

    
    
    
    

function delete_last_text_source_trigger(pressed)
    if not pressed or last_created_source_name == nil then return end
    
    local source = obslua.obs_get_source_by_name(last_created_source_name)
    if source ~= nil then
        local scene_source = obslua.obs_frontend_get_current_scene()
        local scene = obslua.obs_scene_from_source(scene_source)
        local item = obslua.obs_scene_find_source(scene, last_created_source_name)
        
        if item ~= nil then
            obslua.obs_sceneitem_remove(item)
        end
        
        obslua.obs_source_release(source)
        obslua.obs_source_release(scene_source)
        
        print("RearSilver's Text Dropper: Deleted source '" .. last_created_source_name .. "'")
        last_created_source_name = nil
    else
        print("RearSilver's Text Dropper: No source to delete.")
    end
end
function on_click_apply(props, prop)
    apply_text()
    return true
end

function create_text_source_hotkey_trigger(pressed)
    if not pressed then return end
    apply_text()
end

local script_settings = nil

function script_load(settings)
    global_settings = settings
    script_settings = settings -- Store settings locally

    -- Print the initial color when loading
    local initial_color = obslua.obs_data_get_int(settings, "color")
    print("DEBUG: Initial Color on Load =", string.format("0x%06X", initial_color))

    -- Print the source name base when loading
    local name_base = obslua.obs_data_get_string(settings, "source_name_base")
    print("Loaded with source name base: '" .. (name_base or "nil") .. "'")

    hotkey_id_create = obslua.obs_hotkey_register_frontend("rear_textdrop.create", "Drop Text Source (RearSilver)", create_text_source_hotkey_trigger)
    local hotkey_array_create = obslua.obs_data_get_array(settings, "rear_textdrop.create")
    obslua.obs_hotkey_load(hotkey_id_create, hotkey_array_create)
    obslua.obs_data_array_release(hotkey_array_create)

    hotkey_id_delete = obslua.obs_hotkey_register_frontend("rear_textdrop.delete", "Delete Last Text Source (RearSilver)", delete_last_text_source_trigger)
    local hotkey_array_delete = obslua.obs_data_get_array(settings, "rear_textdrop.delete")
    obslua.obs_hotkey_load(hotkey_id_delete, hotkey_array_delete)
    obslua.obs_data_array_release(hotkey_array_delete)

    last_created_source_name = obslua.obs_data_get_string(settings, "last_created_source_name")
    source_prefix = obslua.obs_data_get_string(settings, "source_name_base") or source_prefix
end

function script_save(settings)
    local hotkey_array_create = obslua.obs_hotkey_save(hotkey_id_create)
    obslua.obs_data_set_array(settings, "rear_textdrop.create", hotkey_array_create)
    obslua.obs_data_array_release(hotkey_array_create)
    
    local hotkey_array_delete = obslua.obs_hotkey_save(hotkey_id_delete)
    obslua.obs_data_set_array(settings, "rear_textdrop.delete", hotkey_array_delete)
    obslua.obs_data_array_release(hotkey_array_delete)
    
    obslua.obs_data_set_string(settings, "last_created_source_name", last_created_source_name)
    obslua.obs_data_set_string(settings, "source_name_base", source_prefix)
end

function script_unload()
    -- Nothing specific to unload
end
