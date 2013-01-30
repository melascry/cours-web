<?php
namespace coursWeb;

	class App{
		
		private static $db = false;
		
		public static function getDB()
		{
			if(self::$db === false)
			{
				self::$db = new \PDO(DB_DRIVER.':host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS);
				self::$db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_WARNING);
				self::$db->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_OBJ);
				self::$db->exec('SET CHARACTER SET utf8');
			}
			return self::$db;
		}
		
		public static function handleConnectionForm()
		{
			$db = self::getDB();
			//\coursWeb\Utils::debug($_POST);
			Utils::debug($_POST);
			if(isset($_POST['action-register']) || isset($_POST['action-login']) )
			{
				if(!isset($_POST['login']))
				{
					trigger_error('Missing Login');
				}
				else if(!isset($_POST['password']))
				{
					trigger_error('Missing password');
				}
				else
				{
					$password = \AesCtr::decrypt($_POST['password'], 'wUpQgx3NGl/8T+7OG2KvGtlj31Fd+32r1+BRQ2TIMCU=', 256);
		
					Utils::debug($_POST);
					
					echo'password = '.$password;
					
					if(isset($_POST['action-register']))
					{
						User::register($_POST['login'], $password);
					}
					elseif(isset($_POST['action-login']))
					{
						if(User::login($_POST['login'], $password))
						{
							header('Location: index.php');
						}
						else
						{
							header('Location: index.php?bad_login='.$_POST['login']);
						}
					}
				}
			}
		}

		public static function handleGameForm()
		{
			if(isset($_REQUEST['logout']))
			{
				session_destroy();
				header('Location: index.php');
			}
		}
	}
