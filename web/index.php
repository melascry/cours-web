<?php
include_once('../app/config.php');

//coursWeb\test\Test::test();

coursWeb\App::handleConnectionForm();
include TEMPLATES_PATH.'connect.tpl';

//phpinfo();