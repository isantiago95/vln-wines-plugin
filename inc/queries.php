<?php

/* function to get all stack categories */
function getStackCategories(){
    global $wpdb;
    $ms_stack = $wpdb->prefix . 'ms_stack';
    $query = "SELECT * FROM $ms_stack";
    $query_result = $wpdb->get_results($query, ARRAY_A);
    return rest_ensure_response($query_result);
}