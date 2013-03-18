<?php 
use coursWeb\DataStore;

require_once('../app/config.php');

DataStore::generateConstants();

DataStore::generate();