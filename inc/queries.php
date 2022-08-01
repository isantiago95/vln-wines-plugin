<?php


/* function to get all products */
function getAllWines(){
    global $wpdb;
    $vln_wines = $wpdb->prefix . 'wines';
    $query = "SELECT * FROM $vln_wines";
    $query_result = $wpdb->get_results($query, ARRAY_A);
    return rest_ensure_response($query_result);
}

function createWine($req){
    global $wpdb;
    
    $name = sanitize_text_field($req['name']);
    $image_url = sanitize_text_field($req['image_url']);
    $status = sanitize_text_field($req['status']);
    $description_es = sanitize_text_field($req['description_es']);
    $description_en = sanitize_text_field($req['description_en']);
    $grape_varietal_es = sanitize_text_field($req['grape_varietal_es']);
    $origin_country_es = sanitize_text_field($req['origin_country_es']);
    $food_pairing_es = sanitize_text_field($req['food_pairing_es']);
    $awards_es = sanitize_text_field($req['awards_es']);
    $grape_varietal_en = sanitize_text_field($req['grape_varietal_en']);
    $origin_country_en = sanitize_text_field($req['origin_country_en']);
    $food_pairing_en = sanitize_text_field($req['food_pairing_en']);
    $awards_en = sanitize_text_field($req['awards_en']);
    $award_image = sanitize_text_field($req['award_image']);
    $price_es = sanitize_text_field($req['price_es']);
    $price_en = sanitize_text_field($req['price_en']);
    $datasheet_es = sanitize_text_field($req['datasheet_es']);
    $datasheet_en = sanitize_text_field($req['datasheet_en']);


    $vln_wines = $wpdb->prefix . 'wines';
    $data = [
        'name' => $name,
        'image_url' => $image_url,
        'status' => $status,
        'description_es' => $description_es,
        'description_en' => $description_en,
        'grape_varietal_es' => $grape_varietal_es,
        'origin_country_es' => $origin_country_es,
        'food_pairing_es' => $food_pairing_es,
        'awards_es' => $awards_es,
        'grape_varietal_en' => $grape_varietal_en,
        'origin_country_en' => $origin_country_en,
        'food_pairing_en' => $food_pairing_en,
        'awards_en' => $awards_en,
        'award_image' => $award_image,
        'price_es' => $price_es,
        'price_en' => $price_en,
        'datasheet_es' => $datasheet_es,
        'datasheet_en' => $datasheet_en,
    ];
    $query_response = $wpdb->insert($vln_wines,$data);
    $id = $wpdb->insert_id;

    // var_dump($query_response, $id);
    
    $result = (object) [
        "query_response" => $query_response === 1 ? 'success' : 'error',
        "id" => $id
    ];

    return rest_ensure_response($result);
}

function updateWine($req){
    global $wpdb;

    $id = sanitize_text_field($req['id']);
    $name = sanitize_text_field($req['name']);
    $image_url = sanitize_text_field($req['image_url']);
    $status = sanitize_text_field($req['status']);
    $description_es = sanitize_text_field($req['description_es']);
    $description_en = sanitize_text_field($req['description_en']);
    $grape_varietal_es = sanitize_text_field($req['grape_varietal_es']);
    $origin_country_es = sanitize_text_field($req['origin_country_es']);
    $food_pairing_es = sanitize_text_field($req['food_pairing_es']);
    $awards_es = sanitize_text_field($req['awards_es']);
    $grape_varietal_en = sanitize_text_field($req['grape_varietal_en']);
    $origin_country_en = sanitize_text_field($req['origin_country_en']);
    $food_pairing_en = sanitize_text_field($req['food_pairing_en']);
    $awards_en = sanitize_text_field($req['awards_en']);
    $award_image = sanitize_text_field($req['award_image']);
    $price_es = sanitize_text_field($req['price_es']);
    $price_en = sanitize_text_field($req['price_en']);
    $datasheet_es = sanitize_text_field($req['datasheet_es']);
    $datasheet_en = sanitize_text_field($req['datasheet_en']);

    $vln_wines = $wpdb->prefix . 'wines';
    $data = [
        'name' => $name,
        'image_url' => $image_url,
        'status' => $status,
        'description_es' => $description_es,
        'description_en' => $description_en,
        'grape_varietal_es' => $grape_varietal_es,
        'origin_country_es' => $origin_country_es,
        'food_pairing_es' => $food_pairing_es,
        'awards_es' => $awards_es,
        'grape_varietal_en' => $grape_varietal_en,
        'origin_country_en' => $origin_country_en,
        'food_pairing_en' => $food_pairing_en,
        'awards_en' => $awards_en,
        'award_image' => $award_image,
        'price_es' => $price_es,
        'price_en' => $price_en,
        'datasheet_es' => $datasheet_es,
        'datasheet_en' => $datasheet_en,
    ];
    $query_response = $wpdb->update($vln_wines,$data, ['id'=>$id]);
        
    // var_dump($query_response);
    
    $result = (object) [
        "query_response" => $query_response === 1 ? 'success' : 'error',
        "req" => $req
    ];

    return rest_ensure_response($result);
}

function deleteWine($req){
    global $wpdb;
    
    $id = sanitize_text_field($req['id']);

    $vln_wines = $wpdb->prefix . 'wines';
    $query_response = $wpdb->delete($vln_wines,['id'=>$id]);

    $result = (object) [
        "query_response" => $query_response === 1 ? 'success' : 'error',
    ];
    return rest_ensure_response($result);
}