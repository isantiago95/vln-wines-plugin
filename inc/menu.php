<?php

function vln_wines_custom_admin_menu(){
    add_menu_page(
        __( 'Wines Directory', 'vln-wines-directory' ),
        __('Wines Directory', 'vln-wines-directory' ),
        'manage_options',
        'vln-wines-menu',
        'devs_custom_submenu_template_callback',
        VLN_URL . 'assets/code.png'
    );
    add_submenu_page(
        'vln-wines-menu',
        __( 'Wines Directory', 'vln-wines-directory' ),
        __( 'Wines Directory', 'vln-wines-directory' ),
        'manage_options',
        'vln-wines-menu',
        'devs_custom_submenu_template_callback'
    );
    add_submenu_page(
        'vln-wines-menu',
        __( 'Stack', 'vln-wines-directory' ),
        __( 'Stack', 'vln-wines-directory' ),
        'manage_options',
        'vln-wines-menu-2',
        'devs_custom_submenu_template_callback_stack'
    );
}
add_action( 'admin_menu', 'vln_wines_custom_admin_menu' );

function devs_custom_submenu_template_callback(){
    ?>
    <div class="wrap"><div id="vln-wines-directory-admin"></div></div>
    <?php
}

function devs_custom_submenu_template_callback_stack(){
    ?>
    <div class="wrap"><div id="vln-wines-directory-stack"></div></div>
    <?php
}