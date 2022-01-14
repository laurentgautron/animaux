<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class UserProfileVoter extends Voter
{

    const USER_VIEW = 'view';
    const USER_EDIT = 'edit';

    protected function supports(string $attribute, $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::USER_VIEW, self::USER_EDIT])
            && $subject instanceof \App\Entity\User;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $currentUser = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$currentUser instanceof UserInterface) {
            return false;
        }

        if (!$subject instanceof User) {
            return false;
        }

        $user = $subject;

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::USER_VIEW:
                // logic to determine if the user can VIEW
                return $this->canView($currentUser, $user);
                
            case self::USER_EDIT:
                // logic to determine if the user can EDIT
                return $this->canEdit($currentUser, $user);
        }
    }

    private function canView(User $currentUser, User $user)
    {
        if ($this->canEdit($currentUser, $user)) {
            return true;
        } else {
            return false;
        }
    }

    private function canEdit(User $currentUser, User $user):bool
    {
        //dd($currentUser->getRoles()[0] === "ROLE_ADMIN");
        return ($currentUser->getId() === $user->getId() || $currentUser->getRoles()[0] === "ROLE_ADMIN");
    }
}
