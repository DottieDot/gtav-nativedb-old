All calls to this native are preceded by calls to GRAPHICS::_0x61BB1D9B3A95D802 and GRAPHICS::_0xC6372ECD45D73BCD, respectively.

"act_cinema.ysc", line 1483:
UI::SET_HUD_COMPONENT_POSITION(15, 0.0, -0.0375);
UI::SET_TEXT_RENDER_ID(l_AE);
GRAPHICS::_0x61BB1D9B3A95D802(4);
GRAPHICS::_0xC6372ECD45D73BCD(1);
if (GRAPHICS::_0x0AD973CA1E077B60(${movie_arthouse})) {
    GRAPHICS::DRAW_TV_CHANNEL(0.5, 0.5, 0.7375, 1.0, 0.0, 255, 255, 255, 255);
} else { 
    GRAPHICS::DRAW_TV_CHANNEL(0.5, 0.5, 1.0, 1.0, 0.0, 255, 255, 255, 255);
}

"am_mp_property_int.ysc", line 102545:
if (ENTITY::DOES_ENTITY_EXIST(a_2._f3)) {
    if (UI::IS_NAMED_RENDERTARGET_LINKED(ENTITY::GET_ENTITY_MODEL(a_2._f3))) {
        UI::SET_TEXT_RENDER_ID(a_2._f1);
        GRAPHICS::_0x61BB1D9B3A95D802(4);
        GRAPHICS::_0xC6372ECD45D73BCD(1);
        GRAPHICS::DRAW_TV_CHANNEL(0.5, 0.5, 1.0, 1.0, 0.0, 255, 255, 255, 255);
        if (GRAPHICS::GET_TV_CHANNEL() == -1) {
            sub_a8fa5(a_2, 1);
        } else { 
            sub_a8fa5(a_2, 1);
            GRAPHICS::ATTACH_TV_AUDIO_TO_ENTITY(a_2._f3);
        }
        UI::SET_TEXT_RENDER_ID(UI::GET_DEFAULT_SCRIPT_RENDERTARGET_RENDER_ID());
    }
}
