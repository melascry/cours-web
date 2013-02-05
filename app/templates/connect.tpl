<?php
include 'common-header.tpl';

//coursWeb\Utils::debug($_SERVER);
?>
</head>
<body>
<form method="POST" id="connect-form" action="<?php echo $_SERVER['PHP_SELF'];?>" onsubmit="return $.encrypt()">
<label for="login">Login</label> 
<input type="text" id="login" name="login"/><br/>
<label for="password">Password</label> 
<input type="password" id="password" name="password"/><br/>
<input type="submit" value="Login" name="action-login"/>
<input type="submit" value="Register" name="action-register"/>
</form>
</body>
</html>