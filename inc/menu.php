<?php

function ms_devs_custom_admin_menu(){
    add_menu_page(
        __( 'Devs Portfolio', 'ms-devs-portfolio' ),
        __('Devs Portfolio', 'ms-devs-portfolio' ),
        'manage_options',
        'ms-devs-menu',
        'devs_custom_submenu_template_callback',
        MS_DEVS_URL . 'assets/code.png'
    );
    add_submenu_page(
        'ms-devs-menu',
        __( 'Devs Portfolio', 'ms-devs-portfolio' ),
        __( 'Devs Portfolio', 'ms-devs-portfolio' ),
        'manage_options',
        'ms-devs-menu',
        'devs_custom_submenu_template_callback'
    );
    add_submenu_page(
        'ms-devs-menu',
        __( 'Stack', 'ms-devs-portfolio' ),
        __( 'Stack', 'ms-devs-portfolio' ),
        'manage_options',
        'ms-devs-menu-2',
        'devs_custom_submenu_template_callback_stack'
    );
}
add_action( 'admin_menu', 'ms_devs_custom_admin_menu' );

function devs_custom_submenu_template_callback(){
    ?>
    <div class="wrap"><div id="ms-devs-portfolio-app"></div></div>
    <?php
}

function devs_custom_submenu_template_callback_stack(){
    ?>
    <div class="wrap"><div id="ms-devs-portfolio-stack"></div></div>
    <?php
}