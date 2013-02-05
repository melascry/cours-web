<?php
include('../app/config.php');

if(!isset($_SESSION['user']))
{
	$result = array('error' => 'Session espired');
}
else
{
	$result = array();
	if(!isset($_POST['action']))
	{
		$result = array('error'=> 'Missing Action');
	}
	else
	{
		switch($_POST['action'])
		{
			case 'mobKill':
				$_SESSION['user']->addXP($_POST['killCount']);
				$result = array('xp' => $_SESSION['user']->getXP());
				break;
		}
	}
}
echo json_encode($result);
