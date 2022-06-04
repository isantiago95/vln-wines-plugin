<?php


/* function to get all stack categories */
function getStackCategories(){
    global $wpdb;
    $ms_stack = $wpdb->prefix . 'ms_stack';
    $query = "SELECT * FROM $ms_stack";
    $query_result = $wpdb->get_results($query, ARRAY_A);
    return rest_ensure_response($query_result);
}

function msCreateUser($req){
    global $wpdb;

    $name = sanitize_text_field($req['name']);
    $image_url = sanitize_text_field($req['image_url']);
    $description = sanitize_text_field($req['description']);
    $role = sanitize_text_field($req['role']);
    $country = sanitize_text_field($req['country']);
    $years_experience = sanitize_text_field($req['years_experience']);
    $stack = sanitize_text_field($req['stack']);
    $city = sanitize_text_field($req['city']);
    $history = sanitize_text_field($req['history']);

    $ms_devs = $wpdb->prefix.'ms_devs';
    $data = [
        'name' => $name,
        'image_url' => $image_url,
        'description' => $description,
        'role' => $role,
        'country' => $country,
        'years_experience' => $years_experience,
        'stack' => $stack,
        'city' => $city,
        'history' => $history
    ];

    $query_response = $wpdb->insert($ms_devs,$data);
    $id = $wpdb->insert_id;

    $result = (object) [
        "query_response" => $query_response,
        "id" => $id
    ];

    return rest_ensure_response($result);
}

function getDevelopers(){
    global $wpdb;
    $ms_devs = $wpdb->prefix.'ms_devs';
    $query = "SELECT * FROM $ms_devs";
    $query_result = $wpdb->get_results($query, ARRAY_A);
    return rest_ensure_response($query_result);
}