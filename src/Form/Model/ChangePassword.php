<?php

namespace App\Form\Model;

use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;

class ChangePassword
{
    #[SecurityAssert\UserPassword(message: "mauvaise valeur pour le mot de passe actuel",)]

    public $oldPassword;

    public $newPassword;

    function getOldpassword() {
        return $this-> oldPassword;
    }

    function getNewPassword() {
        return $this-> newPassword;
    }

    function setOldpassword() {
        return $this-> oldPassword;
    }

    function setNewpassword() {
        return $this-> newPassword;
    }
}