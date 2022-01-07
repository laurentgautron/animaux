<?php

namespace App\Controller;

use App\Entity\User;
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
        
        $form = $this->createForm(UserFormType::class, null, ['research' => true]);
        
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $userList = $userRepository->findByLastName($form->getData()->getLastName());
        } else {
            $userList = $paginator->paginate(
                $data,
                $request->query->getInt('page', 1),
                3
            );
        }

        return $this->render('user/index.html.twig',[
            'userForm' => $form->createView(),
            'users' => $userList,
        ]);
    }

    #[Route('/user/edit/{id}', name: 'app_user_edit')]
    public function edit(Request $request, User $user, UserRepository $userRepository, EntityManagerInterface $em)
    {
        $roles = ['Administrateur' => 'ROLL_ADMIN', 'Collaborateur' => 'ROLL_COLL'];
        $form = $this->createForm(UserFormType::class, $user, ['research' => false]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('app_user_research');
        }

        return $this->render('user/edit.html.twig', [
            'form'  => $form->createView(),
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
