<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Mobile_Detect;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index( UserRepository $userRepository ): Response
    {
        $detect = new Mobile_Detect();
        $mobile = false;
        if ($detect->is_mobile()) {
            $mobile = true;
        }
        $userList = $userRepository->findAll();
        return $this->render('user/index.html.twig',[
            'users' => $userList,
            'mobile' => $mobile,
        ]);
    }
}
