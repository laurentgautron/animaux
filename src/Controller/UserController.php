<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\ResetPasswordType;
use APP\Form\model\ChangePassword;
use App\Form\RegistrationFormType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserController extends AbstractController
{
    #[Route('admin/user/research', name: 'app_user_research')]
    public function index(UserRepository $userRepository, Request $request, PaginatorInterface $paginator): Response
    {
        $user = new User();
        $data = $userRepository->findAll();
        $is_find = true;

        $form = $this->createForm(RegistrationFormType::class, $user, ['research' => true]);
        // $form->remove('plainPassword');
        // $form->remove('agreeTerms');
        // $form->remove('roles');
        // $form->remove('email');
        // $form->remove('firstName');

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

        return $this->render('user/index.html.twig', [
            'userForm' => $form->createView(),
            'users' => $userList,
            'is_find'  => $is_find,
            'page' => $request->query->getInt('page', 1)
        ]);
    }

    #[Route('admin/user/edit/{id}', name: 'app_user_edit')]
    public function edit(Request $request, User $user, EntityManagerInterface $em)
    {
        $form = $this->createForm(RegistrationFormType::class, $user, ['research' => false]);
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

    #[Route('/profile/user/{id}', name: 'app_user_read')]
    public function read(User $user)
    {
        $this->denyAccessUnlessGranted('view', $user);
        return $this->render('user/read.html.twig', compact('user'));
    }

    #[Route('admin/user/delete/{id}', name: 'app_user_delete')]
    public function del(User $user, EntityManagerInterface $em)
    {
        $em->remove($user);
        $em->flush();

        return $this->redirectToRoute('app_user_research');
    }

    #[Route('/user/new-password/{id}', name: 'app_user_new_password')]
    public function changPassword(
        Request $request, 
        EntityManagerInterface $em, 
        UserPasswordHasherInterface $userPasswordHasherInterface,
        User $user
        )
    {
        //$this->denyAccessUnlessGranted('newPass', $user);
        $changePassword = new ChangePassword();
        $form = $this->createForm(ResetPasswordType::class, $changePassword);

        $form->handleRequest($request);

        if ( $form->isSubmitted() && $form->isValid()) {
            $newPwd = $form->get('password')['first'] ->getData();
            $newEncodePwd = $userPasswordHasherInterface->hashPassword($user, $newPwd);
            $user->setPassword($newEncodePwd);
            $em->persist($user);
            $em->flush();
        }

        return $this->render('user/changePass.html.twig', [
            'form' => $form->createView(),
        ]);
    }

}
