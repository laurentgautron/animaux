<?php

namespace App\Controller;

use App\Form\UserFormType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/user/research', name: 'app_user_research')]
    public function index( UserRepository $userRepository, Request $request ): Response
    {
        $userList = $userRepository->findAll();
        $form = $this->createForm(UserFormType::class, null, ['research' => true]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userList = $userRepository->findByLastName($form->getData()->getNom());
        }

        return $this->render('user/index.html.twig',[
            'userForm' => $form->createView(),
            'users' => $userList,
        ]);
    }
}
