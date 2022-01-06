<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index(UserRepository $userRepository, Request $request ): Response
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

    #[Route('/user/read/{id}', name: 'app_user_read')]
    public function edit(Request $request, User $user, UserRepository $userRepository, EntityManagerInterface $em)
    {
        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);

        return $this->render('user/read.hml.twig', [
            'form'  => $form->createView(),
        ]);
    }
}
