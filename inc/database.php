<?php
if (!defined('ABSPATH')) exit;

function vln_wines_createdatabase()
{
  global $wpdb;

  /* table to save wines categories */
  $vln_wines = $wpdb->prefix . 'wines';
  $charset_collate = $wpdb->get_charset_collate();
  $query = "CREATE TABLE IF NOT EXISTS $vln_wines (
  `id`	INT(3) NOT NULL AUTO_INCREMENT,
  `award_image` VARCHAR(500) DEFAULT NULL,
  `awards_en` VARCHAR(500) DEFAULT NULL,
  `awards_es` VARCHAR(500) DEFAULT NULL,
  `bottle_price_en` VARCHAR(100) DEFAULT NULL,
  `bottle_price_es` VARCHAR(100) DEFAULT NULL,
  `box_price_en` VARCHAR(100) DEFAULT NULL,
  `box_price_es` VARCHAR(100) DEFAULT NULL,
  `datasheet_en` VARCHAR(500) DEFAULT NULL,
  `datasheet_es` VARCHAR(500) DEFAULT NULL,
  `description_en` VARCHAR(1000) DEFAULT NULL,
  `description_es` VARCHAR(1000) DEFAULT NULL,
  `food_pairing_en` VARCHAR(500) DEFAULT NULL,
  `food_pairing_es` VARCHAR(500) DEFAULT NULL,
  `grape_varietal_en` VARCHAR(500) DEFAULT NULL,
  `grape_varietal_es` VARCHAR(500) DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `name`	VARCHAR(50) DEFAULT NULL,
  `origin_country_en` VARCHAR(500) DEFAULT NULL,
  `origin_country_es` VARCHAR(500) DEFAULT NULL,
  `status`	VARCHAR(20) DEFAULT 'draft',
  PRIMARY KEY(id)) $charset_collate;";
  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($query);

}

?>