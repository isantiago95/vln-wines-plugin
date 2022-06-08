<?php
if (!defined('ABSPATH')) exit;

function ms_devs_createdatabase()
{
  global $wpdb;

  /* table to save stack categories */
  $ms_stack = $wpdb->prefix . 'ms_stack';
  $charset_collate = $wpdb->get_charset_collate();
  $sql2 = "CREATE TABLE IF NOT EXISTS $ms_stack (
  `id` INT (3) NOT NULL AUTO_INCREMENT,
  `is_active` BOOLEAN DEFAULT TRUE,
  `name` VARCHAR(100) DEFAULT NULL,
  `image_url` VARCHAR(800) DEFAULT NULL,
  PRIMARY KEY(id)) $charset_collate;";
  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($sql2);

  $placeholder = '/wp-content/plugins/portfolio-cvs-marscript/assets/programming-logos';

  /* agrega las categorias al activar el plugin */
  $wpdb->query("INSERT IGNORE INTO $ms_stack
  (id,is_active,name, image_url)
  VALUES
  ('1',true,'React Js', '$placeholder/react-logo.svg'),
  ('2',true,'Vue Js', '$placeholder/vue-logo.svg'),
  ('3',true,'Angular', '$placeholder/angular-logo.svg'),
  ('4',true,'Next Js', '$placeholder/next-js-logo.svg'),
  ('5',true,'React Native', '$placeholder/react-native-logo.svg'),
  ('6',true,'Ionic', '$placeholder/ionic-logo.svg'),
  ('7',true,'Node Js', '$placeholder/nodejs-logo.svg'),
  ('8',true,'.Net Core', '$placeholder/dot-net-core-logo.svg'),
  ('9',true,'Python', '$placeholder/python-logo.svg'),
  ('10',true,'PHP', '$placeholder/php-logo.svg'),
  ('11',true,'Java', '$placeholder/java-logo.svg'),
  ('12',true,'Flutter', '$placeholder/flutter-logo.svg'),
  ('13',true,'AWS', '$placeholder/aws-logo.svg'),
  ('14',true,'Docker', '$placeholder/docker-logo.svg'),
  ('15',true,'Kubernetes', '$placeholder/kubernets-logo.svg'),
  ('16',true,'Go', '$placeholder/go-logo.svg'),
  ('17',true,'Javascript', '$placeholder/javascript-logo.svg'),
  ('18',true,'Typescript', '$placeholder/typescript-logo.svg'),
  ('19',true,'Firebase', '$placeholder/firebase-logo.svg'),
  ('20',true,'Stripe', '$placeholder/stripe-logo.svg'),
  ('21',true,'MongoDB', '$placeholder/mongodb-logo.svg'),
  ('22',true,'MySQL', '$placeholder/mysql-logo.svg'),
  ('23',true,'Redux', '$placeholder/redux-logo.svg'),
  ('24',true,'GraphQL', '$placeholder/graphql-logo.svg'),
  ('25',true,'Azure', '$placeholder/azure-logo.svg'),
  ('26',true,'Express', '$placeholder/express-logo.svg')
  ");


   /* Table to save devs information */
  $ms_devs = $wpdb->prefix . 'ms_devs';
  $charset_collate = $wpdb->get_charset_collate();
  $sql = "CREATE TABLE IF NOT EXISTS $ms_devs (
  `id` INT (3) NOT NULL AUTO_INCREMENT,
  `is_active` BOOLEAN DEFAULT TRUE,
  `name` VARCHAR(50) DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `description` VARCHAR(1500) DEFAULT NULL,
  `role` VARCHAR(100) DEFAULT NULL,
  `country` VARCHAR(50) DEFAULT NULL,
  `years_experience` INT (2) DEFAULT NULL,
  `city` VARCHAR(50) DEFAULT NULL,
  `history` TEXT DEFAULT NULL,
  `preference` VARCHAR(50) DEFAULT NULL,
  PRIMARY KEY(id));
  ) $charset_collate;";
  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($sql);
    
  
  /* table to save stack categories */
  $ms_devs_stack = $wpdb->prefix . 'ms_devs_stack';
  $charset_collate = $wpdb->get_charset_collate();
  $related = "CREATE TABLE IF NOT EXISTS $ms_devs_stack (
  `id` INT (3) NOT NULL AUTO_INCREMENT,
  `id_dev` INT (3) NOT NULL,
  `id_stack` INT (3) NOT NULL,
  `years` INT (2) NOT NULL,
  PRIMARY KEY(id), 
  FOREIGN KEY (id_dev) REFERENCES $ms_devs(id),
  FOREIGN KEY (id_stack) REFERENCES $ms_stack(id)
  ) $charset_collate;";
  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($related);

  $success = empty($wpdb->last_error);
  return $success;
}

?>