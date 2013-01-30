<?php
include_once('../app/config.php');

//coursWeb\test\Test::test();


if(isset($_SESSION['user']))
{
	coursWeb\App::handleGameForm();
	include TEMPLATES_PATH.'game.tpl';
}
else
{
	coursWeb\App::handleConnectionForm();
	include TEMPLATES_PATH.'connect.tpl';
}//phpinfo();