<?php

/* create endopoints */

function vln_permissions($private){
    if($private){
        return current_user_can('publish_posts');
    } else {
        return true;
    }
}

class VLN_wines_Endpoints {

    public function __construct(){
        add_action('rest_api_init', [$this, 'create_api_routes']);
    }

    public function create_api_routes(){
        register_rest_route('vln-api/v1', '/wines', [
            'methods' => 'GET',
            'callback' => [$this,'get_all_wines'],
            'permission_callback' => [$this, 'get_all_wines_permission']
        ]);
        register_rest_route('vln-api/v1', '/wines', [
            'methods' => 'POST',
            'callback' => [$this,'create_wine'],
            'permission_callback' => [$this, 'create_wine_permission']
        ]);
        register_rest_route('vln-api/v1', '/wines/(?P<id>\d+)', [
            'methods' => 'PATCH',
            'callback' => [$this,'update_wine'],
            'permission_callback' => [$this, 'update_wine_permission']
        ]);
        register_rest_route('vln-api/v1', '/wines/(?P<id>\d+)', [
            'methods' => 'DELETE',
            'callback' => [$this,'delete_wine'],
            'permission_callback' => [$this, 'delete_wine_permission']
        ]);
    }

    // functions to call on endpoints
    public function get_all_wines(){
        return getAllWines();
    }
    public function get_all_wines_permission(){
        return vln_permissions(false);
    }
    public function create_wine($req){
        return createWine($req);
    }
    public function create_wine_permission(){
        return vln_permissions(true);
    }
    public function update_wine($req){
        return updateWine($req);
    }
    public function update_wine_permission(){
        return vln_permissions(true);
    }
    public function delete_wine($req){
        return deleteWine($req);
    }
    public function delete_wine_permission(){
        return vln_permissions(true);
    }

}
new VLN_wines_Endpoints();