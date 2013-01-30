<?php
namespace coursWeb
{
	class App{
		
		private static $db = false;
		
		public static function getDB()
		{
			if(self::$db === false)
			{
				self::$db = new \PDO(DB_DRIVER.':host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS);
			}
			return self::$db;
		}
		
		public static function handleConnectionForm()
		{
			//\coursWeb\Utils::debug($_POST);
			Utils::debug($_POST);
			echo'ok connection';
		}	
	}
}