<?php

/* 
* Plugin Name: VLN Wines Directory
* Author: Israel Santiago
* Author URI: https://github.com/isantiago95
* Version: 0.0.1
* Description: A plugin to create an easy CRUD for all wines
* Text-Domain: vln-wines-directory
*/

if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.

/**
 * Define plugin constants
 */
define( 'VLN_PATH', trailingslashit( plugin_dir_path(__FILE__) ) );
define( 'VLN_URL', trailingslashit( plugins_url('/', __FILE__) ) );


/**
 * Loading Necessary Scripts
 */
add_action( 'admin_enqueue_scripts', 'VLN_react_scripts' );
function VLN_react_scripts() {
    wp_enqueue_script( 'vln-wines-plugin', VLN_URL . 'dist/bundle.js', [ 'jquery', 'wp-element' ], wp_rand(), true );
    wp_localize_script( 'vln-wines-plugin', 'appLocalizer', [
        'apiUrl' => home_url( '/wp-json' ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        ] );
}



/* require menu */
require_once VLN_PATH.'inc/menu.php';
/* create custom database */
require_once plugin_dir_path(__FILE__).'inc/database.php';
register_activation_hook( __FILE__, 'vln_wines_createdatabase' );
require_once VLN_PATH.'inc/queries.php';
require_once VLN_PATH.'inc/endpoints.php';