<?php
session_start();
if (isset($_SESSION['test'])) {
    echo 'Session variable: ' . $_SESSION['test'];
} else {
    echo 'Session variable not set.';
}
