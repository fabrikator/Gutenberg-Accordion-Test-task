<?php
/**
 * Plugin Name: Gutenberg Accordion Block
 * Description: A custom Gutenberg block for creating accordion components.
 * Version: 1.0
 * Author: Taras Kotvitskiy
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Enqueue block assets
function gutenberg_accordion_enqueue_assets() {
    // Enqueue editor JavaScript
    wp_enqueue_script(
        'gutenberg-accordion-block',
        plugins_url( 'build/index.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );

    // Enqueue block styles
    wp_enqueue_style(
        'gutenberg-accordion-style',
        plugins_url( 'src/style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' )
    );

    wp_enqueue_style(
        'gutenberg-accordion-editor-style',
        plugins_url( 'src/editor.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' )
    );
}
add_action( 'enqueue_block_editor_assets', 'gutenberg_accordion_enqueue_assets' );
add_action( 'enqueue_block_assets', 'gutenberg_accordion_enqueue_assets' );

