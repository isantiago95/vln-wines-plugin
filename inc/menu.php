<?php

function ms_devs_custom_admin_menu(){
    add_menu_page(
        __( 'Devs Portfolio', 'ms-devs-portfolio' ),
        __('Devs Portfolio', 'ms-devs-portfolio' ),
        'manage_options',
        'ms-devs',
        'devs_custom_submenu_template_callback',
        MS_DEVS_URL . 'assets/developer-icon.png'
    );
}
add_action( 'admin_menu', 'ms_devs_custom_admin_menu' );

function devs_custom_submenu_template_callback(){
    ?>
    <div class="wrap"><div id="ms-devs-portfolio-app"></div></div>
    <?php
}