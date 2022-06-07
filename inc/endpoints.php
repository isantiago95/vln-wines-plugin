<?php

/* create endopoints */

function ms_permissions($private){
    if($private){
        return current_user_can('publish_posts');
    } else {
        return true;
    }
}

class MS_Devs_Endpoints {

    public function __construct(){
        add_action('rest_api_init', [$this, 'create_api_routes']);
    }

    public function create_api_routes(){
        register_rest_route('msapi/v1', '/stack', [
            'methods' => 'GET',
            'callback' => [$this,'get_stack_categories'],
            'permission_callback' => [$this, 'get_stack_categories_permission']
        ]);
        register_rest_route('msapi/v1', '/users', [
            'methods' => 'GET',
            'callback' => [$this,'get_users'],
            'permission_callback' => [$this, 'get_users_permission']
        ]);
        register_rest_route('msapi/v1', '/users', [
            'methods' => 'POST',
            'callback' => [$this,'create_user'],
            'permission_callback' => [$this, 'create_user_permission']
        ]);
        register_rest_route('msapi/v1', '/users', [
            'methods' => 'PUT',
            'callback' => [$this,'update_user'],
            'permission_callback' => [$this, 'update_user_permission']
        ]);
        register_rest_route('msapi/v1', '/users', [
            'methods' => 'DELETE',
            'callback' => [$this,'delete_user'],
            'permission_callback' => [$this, 'delete_user_permission']
        ]);
    }

    // functions to call on endpoints
    public function get_stack_categories(){
        return getStackCategories();
    }
    public function get_stack_categories_permission(){
        return ms_permissions(false);
    }
    
    // devs functions
    public function get_users(){
        return getDevelopers();
    }
    public function get_users_permission(){
        return ms_permissions(false);
    }
    public function create_user($req){
        return msCreateUser($req);
    }
    public function create_user_permission(){
        return ms_permissions(false);
    }
    public function update_user($req){
        return msUpdateUser($req);
    }
    public function update_user_permission(){
        return ms_permissions(false);
    }
    public function delete_user($req){
        return msDeleteUser($req);
    }
    public function delete_user_permission(){
        return ms_permissions(false);
    }

}
new MS_Devs_Endpoints();