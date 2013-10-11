<?php

$dir = dirname(__FILE__);
$ignoreFiles = array(
                     'app-details',
                     '.git',
                     'easy-share.svg',
);
$files = array();
$dh  = opendir($dir);
while (false !== ($filename = readdir($dh))) {
  if (!in_array($filename, $ignoreFiles, true)) {
    $files[] = "'".$filename."'";
  }
}

$zipCmd = 'zip chrome-package.zip ' . implode(" ", $files);
shell_exec($zipCmd);
