<?php
if (!defined('ABSPATH')) exit;

/*
Shortcode to render the front
[vln-wines-directory]
*/

add_shortcode( 'vln-wines-directory', 'vln_front_shortcode');
function vln_front_shortcode(){
ob_start();
?>
<div id="vln-wines-front"></div>
<?php
    $output = ob_get_contents();
    ob_end_clean();
    return $output;
}

?>