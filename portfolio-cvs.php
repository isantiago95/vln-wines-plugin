<?php

/* 
* Plugin Name: Marscript Devs Portfolio
* Author: Israel Santiago
* Author URI: https://github.com/isantiago95
* Version: 0.0.1
* Description: A CV's portfolio to show up in wordpress
* Text-Domain: ms-devs-portfolio
*/

if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.

/**
 * Define plugin constants
 */
define( 'MS_DEVS_PATH', trailingslashit( plugin_dir_path(__FILE__) ) );
define( 'MS_DEVS_URL', trailingslashit( plugins_url('/', __FILE__) ) );


/**
 * Loading Necessary Scripts
 */
add_action( 'admin_enqueue_scripts', 'ms_devs_react_scripts' );
function ms_devs_react_scripts() {
    wp_enqueue_script( 'ms-devs-plugin', MS_DEVS_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_localize_script( 'ms-devs-plugin', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        ] );
}



/* require menu */
require_once MS_DEVS_PATH.'inc/menu.php';
/* create custom database */
require_once plugin_dir_path(__FILE__).'inc/database.php';
register_activation_hook( __FILE__, 'ms_devs_createdatabase' );
require_once MS_DEVS_PATH.'inc/queries.php';
require_once MS_DEVS_PATH.'inc/endpoints.php';