<?php

require_once __DIR__ . "/environment.php";

function getFileIteratorFromPath($path) {
    return new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($path),
        RecursiveIteratorIterator::SELF_FIRST
    );
}

function deleteFilesBeforeTests($path) {
    foreach (getFileIteratorFromPath($path) as $file) {
        if ($file->getExtension() === "php") {
            unlink($file->getPathname());
        }
    }
}

function compileFilesBeforeTests($path) {
    foreach (getFileIteratorFromPath($path) as $file) {
        if ($file->getExtension() === "pre") {
            $pre = $file->getPathname();
            $php = preg_replace("/pre$/", "php", $pre);

            Pre\Plugin\compile($pre, $php, true, true);

            print ".";
        }
    }
}

if (empty(getenv("PREPROCESS_NO_REBUILD"))) {
    print "Building files" . PHP_EOL;

    deleteFilesBeforeTests(__DIR__ . "/../app");
    compileFilesBeforeTests(__DIR__ . "/../app");

    print PHP_EOL;
}
