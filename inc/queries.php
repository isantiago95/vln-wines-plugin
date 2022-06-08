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
    // get all devs
    $ms_devs = $wpdb->prefix.'ms_devs';
    $sql1 = "SELECT * FROM $ms_devs";
    $devs_query = $wpdb->get_results($sql1, ARRAY_A);
    // get all relations
    $ms_devs_stack = $wpdb->prefix . 'ms_devs_stack';
    $sql2 = "SELECT * FROM $ms_devs_stack";
    $stack_query = $wpdb->get_results($sql2, ARRAY_A);

    // group stack results into an array according the id_dev of each
    $group = [];
    foreach ($stack_query as $obj) {
        $group[$obj['id_dev']][] = $obj;
    }

    $result = (object) [
        'devs' => $devs_query,
        'stack' => $group,
    ];

    return rest_ensure_response($result);
}

function msCreateUser($req){
    global $wpdb;

    $name = sanitize_text_field($req['name']);
    $image_url = sanitize_text_field($req['image_url']);
    $description = sanitize_text_field($req['description']);
    $role = sanitize_text_field($req['role']);
    $country = sanitize_text_field($req['country']);
    $years_experience = sanitize_text_field($req['years_experience']);
    $stack = json_decode($req['id_stack']); // will be an array
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
            'id_stack'=>$value->id_stack,
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

    $id = sanitize_text_field($req['id']);
    $name = sanitize_text_field($req['name']);
    $image_url = sanitize_text_field($req['image_url']);
    $description = sanitize_text_field($req['description']);
    $role = sanitize_text_field($req['role']);
    $country = sanitize_text_field($req['country']);
    $years_experience = sanitize_text_field($req['years_experience']);
    $stack = json_decode($req['id_stack']); // will be an array
    $city = sanitize_text_field($req['city']);
    $history = sanitize_text_field($req['history']);
    $preference = sanitize_text_field($req['preference']);

    $ms_devs_stack = $wpdb->prefix.'ms_devs_stack';
    $wpdb->delete($ms_devs_stack,['id_dev'=>$id]);

    foreach ($stack as $key => $value) {
        $wpdb->insert($ms_devs_stack, [
            'id_dev'=>$id,
            'id_stack'=>$value->id_stack,
            'years'=>$value->years
        ]);
    }

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

    $result = (object) [
        "query_response" => $query_response,
    ];

    return rest_ensure_response($result);
}

function msDeleteUser($req){
    global $wpdb;
    
    $id = intval(sanitize_text_field($req['id']));
    
    // $wpdb->show_errors();
    $ms_devs = $wpdb->prefix.'ms_devs';
    $ms_devs_stack = $wpdb->prefix.'ms_devs_stack';

    $delete_relation = $wpdb->delete($ms_devs_stack,['id_dev'=>$id]);
    $delete_dev = $wpdb->delete($ms_devs,['id'=>$id]);
    
    $result = (object) [
        "query_response" => $delete_dev,
        "delete_relation" => $delete_relation,
    ];
    return rest_ensure_response($result);
}