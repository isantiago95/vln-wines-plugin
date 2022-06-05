<?php


/* function to get all stack categories */
function getStackCategories(){
    global $wpdb;
    $ms_stack = $wpdb->prefix . 'ms_stack';
    $query = "SELECT * FROM $ms_stack";
    $query_result = $wpdb->get_results($query, ARRAY_A);
    return rest_ensure_response($query_result);
}


function getDevelopers(){
    global $wpdb;
    $ms_devs = $wpdb->prefix.'ms_devs';
    $query = "SELECT * FROM $ms_devs";
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
    $stack = json_decode($req['stack']); // will be an array
    $city = sanitize_text_field($req['city']);
    $history = sanitize_text_field($req['history']);
    $preference = sanitize_text_field($req['preference']);


    $ms_devs = $wpdb->prefix.'ms_devs';
    $data = [
        'name' => $name,
        'image_url' => $image_url,
        'description' => $description,
        'role' => $role,
        'country' => $country,
        'years_experience' => $years_experience,
        'city' => $city,
        'history' => $history,
        'preference' => $preference
    ];
    $query_response = $wpdb->insert($ms_devs,$data);
    $id = $wpdb->insert_id;
    
    $ms_devs_stack = $wpdb->prefix . 'ms_devs_stack';

    foreach ($stack as $key => $value) {
        $wpdb->insert($ms_devs_stack, [
            'id_dev'=>$id,
            'id_stack'=>$value->stack,
            'years'=>$value->years
        ]);
    }
    
    $result = (object) [
        "query_response" => $query_response,
        "id" => $id
    ];

    return rest_ensure_response($result);
}

function msUpdateUser($req){
    global $wpdb;
    $body = $req->get_body();
    var_dump($body);

    $id = sanitize_text_field($req['id']);
    $name = sanitize_text_field($body['name']);
    $image_url = sanitize_text_field($body['image_url']);
    $description = sanitize_text_field($body['description']);
    $role = sanitize_text_field($body['role']);
    $country = sanitize_text_field($body['country']);
    $years_experience = sanitize_text_field($body['years_experience']);
    $stack = json_decode($body['stack']); // will be an array
    $city = sanitize_text_field($body['city']);
    $history = sanitize_text_field($body['history']);
    $preference = sanitize_text_field($body['preference']);


    $values = (object) [
        'id'=>$id,
        'name'=>$name,
        'image_url'=>$image_url,
        'description'=>$description,
        'role'=>$role,
        'country'=>$country,
        'years_experience'=>$years_experience,
        'stack'=>$stack,
        'city'=>$city,
        'history'=>$history,
        'preference'=>$preference,
    ];

    var_dump($values);

    $ms_devs = $wpdb->prefix.'ms_devs';
    $data = [
        'name' => $name,
        'image_url' => $image_url,
        'description' => $description,
        'role' => $role,
        'country' => $country,
        'years_experience' => $years_experience,
        'city' => $city,
        'history' => $history,
        'preference' => $preference
    ];
    $query_response = $wpdb->update($ms_devs,$data, ['id'=>$id]);
    
    $ms_devs_stack = $wpdb->prefix . 'ms_devs_stack';


    foreach ($stack as $key => $value) {
        $wpdb->update($ms_devs_stack, [
            'id_stack'=>$value->stack,
            'years'=>$value->years
        ],
        ['id_dev'=>$id]);
    }
    
    $result = (object) [
        "query_response" => $query_response,
    ];

    return rest_ensure_response($result);
}