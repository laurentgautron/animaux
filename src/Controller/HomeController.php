<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(Request $request): Response
    {
        $id = 0;
        if ($request->query->get('id')) {
            $id = $request->query->get('id');
        }
        
        return $this->render('home/index.html.twig', [
            'id' => $id
        ]);
    }
}
