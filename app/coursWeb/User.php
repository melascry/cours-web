<?php
namespace coursWeb;

class User{
	
	private $id;
	private $login;
	private $xp = 0;
	private $hp = 0;
	private $power = 0;
	
	private function __construct($id, $login, $xp, $hp, $power){
		$this->id = (int)$id;
		$this->login = $login;
		$this->xp = (int)$xp;
		$this->hp = (int)$hp;
		$this->power = (int)$power;
	}
	
	public function toJSON(){
		return json_encode(array(
			'id' => $this->id,
			'login' => $this->login,
			'xp' => $this->xp,
			'hp' => $this->hp,
			'power' => $this->power,
		));
	}
	
	public function addXP($xpToAdd){
		$query = App::$db->prepare('UPDATE user SET xp=xp+? WHERE id=?');
		if($query->execute(array($xpToAdd, $this->id))){
			$query = App::$db->prepare('SELECT xp FROM user WHERE id=? LIMIT 1');
			if($query->execute(array($this->id))){
				$res = $query->fetch();
				if($res){
					$this->xp = $res->xp;
				}
			}
		}	
	}
	
	public function getXP(){
		return $this->xp;
	}
	
	public static function login($login, $password){
				
		$query = App::getDB()->prepare('SELECT * FROM user where login=? LIMIT 1');
		//$query = App::$db->prepare('SELECT * FROM user where login=? AND password='.sha1($password).' LIMIT 1');
		if($query->execute(array($login)))
		{
			$res = $query->fetch();
			if($res)
			{
				if(\PasswordHashUtils::validate_password($password, $res->hash))
				{

					echo' my ID is '.$res->id;
					$_SESSION['user'] = new user($res->id, $res->login, $res->xp, $res->health,$res->power);
				}
				/*new User($res);
				$alias = $res;
				$alias = 2; // donc $res = 2
				*/
			}
		}
	}
	/**
	 * 
	 * @param unknown $login
	 * @param unknown $password
	 */
	public static function register($login, $password){
		echo'registering '.$login.' : '.$password;
		
		$query = App::getDB()->prepare('INSERT INTO user (login,hash) VALUES (?, ?)');
		$param = array($login, \PasswordHashUtils::create_hash($password));
		if($query->execute($param))
		{
			echo' Register Query succesfull';
		}
	}
}