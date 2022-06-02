<?php

/* create endopoints */

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
    }

    public function get_stack_categories(){
        return getStackCategories();
    }
    public function get_stack_categories_permission(){
        return true;
    }
}
new MS_Devs_Endpoints();