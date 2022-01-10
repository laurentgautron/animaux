<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Form\UserFormType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    #[Route('/user/research', name: 'app_user_research')]
    public function index(UserRepository $userRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $data = $userRepository->findAll();
        $is_find = true;

        $form = $this->createForm(RegistrationFormType::class);
        $form->remove('plainPassword');
        $form->remove('agreeTerms');
        $form->remove('role');
        $form->remove('email');
        $form->remove('firstName');

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            if ($userRepository->findBy(['lastName' => $form->getData()->getLastName()]) != null) {
                $data = $userRepository->findBy(['lastName' => $form->getData()->getLastName()]);
            } else {
                $is_find = false;
            }
        }

        $userList = $paginator->paginate(
            $data,
            $request->query->getInt('page', 1),
            3
        );

        //dd($form->getData()->getLastName());

        //dd($is_find);

        return $this->render('user/index.html.twig', [
            'userForm' => $form->createView(),
            'users' => $userList,
            'is_find'  => $is_find,
            'page' => $request->query->getInt('page', 1)
        ]);
    }

    #[Route('/user/edit/{id}', name: 'app_user_edit')]
    public function edit(Request $request, User $user, UserRepository $userRepository, EntityManagerInterface $em)
    {
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->remove('agreeTerms');
        $form->remove('plainPassword');

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('app_user_research');
        }

        return $this->render('user/edit.html.twig', [
            'form'  => $form->createView(),
            'user' => $user,
        ]);
    }

    #[Route('/user/read/{id}', name: 'app_user_read')]
    public function read(User $user)
    {
        return $this->render('user/read.html.twig', compact('user'));
    }

    #[Route('/user/delete/{id}', name: 'app_user_delete')]
    public function del(User $user, EntityManagerInterface $em)
    {
        $em->remove($user);
        $em->flush();

        return $this->redirectToRoute('app_user_research');
    }
}
