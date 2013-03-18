<?php 
use coursWeb\Utils;
use coursWeb\DataStore;

include '../app/config.php';

// Utils::debug(DataStore::getInstance()->ennemyList);

header('Content-Type: text/javascript');

echo 'var dataStore='.DataStore::getInstance()->toJSON().';';

