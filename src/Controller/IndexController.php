<?php

namespace App\Controller;

use App\Entity\Tweets;
use App\Entity\Hashtag;
use Symfony\Component\HttpFoundation\JsonResponse;
use \TwitterAPIExchange;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;


class IndexController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="index", priority="-1", defaults={"reactRouting": null}, requirements={"reactRouting"=".+"})
     */
    public function index()
    {
        return $this->render('index/index.html.twig', ['controller_name' => 'IndexController']);
    }

    /**
     * @Route("/api/tweets", name="tweets")
     * @return JsonResponse
     */
    public function getTweets()
    {
        $entityManager = $this->getDoctrine()->getManager();
        $productRepository = $entityManager->getRepository(Tweets::class);
        $tweets = $productRepository->findAll();

        $serializer = $this->get('serializer');
        $data = $serializer->serialize($tweets, 'json');

        return new Response($data);
    }

    /**
     * @Route("/api/hashtag", name="hashtag")
     * @return JsonResponse
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getHashtag()
    {

        $entityManager = $this->getDoctrine()->getManager();
        $productRepository = $entityManager->getRepository(Hashtag::class)->findBy(array(), array('cantidad' => 'desc'), 10, null);

        $serializer = $this->get('serializer');
        $data = $serializer->serialize($productRepository, 'json');

        return new Response($data);
    }

    /**
     * @Route("/api/update", name="update")
     * @return JsonResponse
     * @throws \Exception
     * @param String $day
     * @param String $sad
     * @param String $neutral
     * @param String $good
     */

    public function updateTweets(Request $request)
    {
        $day = $request->query->get('day');
        $sad = $request->query->get('sad');
        $neutral = $request->query->get('neutral');
        $good = $request->query->get('good');

        $entityManager = $this->getDoctrine()->getManager();

        // Retornatodos los tweets que tengan el dia especificado
        $tweetExite = $entityManager->getRepository(Tweets::class)->findOneBy(array('day' => new \DateTime($day)));

        if ($tweetExite === null) {
            //el tweet con esa fecha no existe asi que lo agrego
            $tweet = new Tweets($sad, $neutral, $good, new \DateTime($day));
            $entityManager->persist($tweet);
            $entityManager->flush($tweet);
        }

        $productRepository = $entityManager->getRepository(Tweets::class);
        $tweets = $productRepository->findAll();

        $serializer = $this->get('serializer');
        $data = $serializer->serialize($tweets, 'json');

        return new Response($data);
    }

    /**
     * @Route("/api/isUpdate", name="isUpdate")
     * @return JsonResponse
     * @param String $day
     */
    public function IsUpdate(Request $request)
    {
        $day = $request->query->get('day');

        $entityManager = $this->getDoctrine()->getManager();

        // Retornatodos los tweets que tengan el dia especificado
        $tweet = $entityManager->getRepository(Tweets::class)->findOneBy(array(), array('day' => 'desc'));

        $serializer = $this->get('serializer');
        $data = $serializer->serialize($tweet, 'json');

        return new Response($data);
    }

    /**
     * @Route("/api/updateHashtags", name="updateHashtags")
     * @param String $texto
     * @param nuleable String $cantidad
     */

    public function updateHashtags(Request $request)
    {
        $texto = $request->query->get('texto');
        $cantidad = $request->query->get('cantidad');

        $entityManager = $this->getDoctrine()->getManager();

        $ExisteHashtag = $entityManager->getRepository(Hashtag::class)->findOneBy(array('name' => $texto));
        if ($cantidad != null) {
            if ($ExisteHashtag === null) {
                $hashtag = new Hashtag($texto, $cantidad);
                $entityManager->persist($hashtag);
                $entityManager->flush($hashtag);
                $retorno = 201;
            } else {
                $ExisteHashtag->setCantidad($ExisteHashtag->getCantidad() + $cantidad);
                $entityManager->flush($ExisteHashtag);
                $retorno = 204;
            }
        }

        $serializer = $this->get('serializer');
        $data = $serializer->serialize($retorno, 'json');

        return new Response($data);
    }

    /**
     * @Route("/api/news", name="news")
     * @return JsonResponse
     * @throws \Exception
     */
    public function getNoticias()
    {
        $settings = array(
            'oauth_access_token' => $_ENV["OAUTH_ACCESS_TOKEN"],
            'oauth_access_token_secret' => $_ENV["OAUTH_ACCESS_TOKEN_SECRET"],
            'consumer_key' => $_ENV["CONSUMER_KEY"],
            'consumer_secret' => $_ENV["CONSUMER_SECRET"],
        );

        $url = 'https://api.twitter.com/1.1/search/tweets.json';
        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $oldArray = array(
            array('Infobae', 'clarincom', 'lanacion', 'cronica'),
            array('cnnbrk', 'nytimes', 'cnn', 'bbcbreaking'),
            array('el_pais', 'lavozdegalicia', 'rtve', 'A3Noticias')
        );
        foreach ($oldArray as $element) {
            $twitter2 = [];
            foreach ($element as $news) {
                $getfield = '?q=from:' . $news . ' covid&count=3&result_type=recent';
                $twitter2[] =  $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();
            }
            $twitter3[] = $twitter2;
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($twitter3));
        return $response;
    }

    /**
     * @Route("/api/getTweetsPerDay", name="getTweetsPerDay")
     * @return JsonResponse
     * @throws \Exception
     * @param String $day
     */
    public function getTweetsPerDay(Request $request)
    {
        $day = $request->query->get('day');
        $settings = array(
            'oauth_access_token' => $_ENV["OAUTH_ACCESS_TOKEN"],
            'oauth_access_token_secret' => $_ENV["OAUTH_ACCESS_TOKEN_SECRET"],
            'consumer_key' => $_ENV["CONSUMER_KEY"],
            'consumer_secret' => $_ENV["CONSUMER_SECRET"],
        );

        $url = 'https://api.twitter.com/1.1/search/tweets.json';
        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $oldArray =
            array('covid', 'coronavirus', 'pandemia', 'cuantentena', 'QuedateEnCasa');
        $twitter2 = [];
        foreach ($oldArray as $element) {
            $getfield = '?q=' . $element . '&count=100&until=' . $day;
            $twitter2[] =  $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($twitter2));
        return $response;
    }

    /**
     * @Route("/api/coordenadas", name="coordenadas")
     * @return JsonResponse
     * @throws \Exception
     * @param String $latitud
     * @param String $longitud
     * @param String $radio
     * @param String $cantidad
     * @param array $filtros
     */
    public function getTweetsPorCoordenada(Request $request)
    {
        $lat = $request->query->get('latitud');
        $lng = $request->query->get('longitud');
        $radio = $request->query->get('radio');
        $cantidad = $request->query->get('cantidad');
        $filtros = $request->query->get('filtros');
        $listaFiltros = explode(",", $filtros,);
        $settings = array(
            'oauth_access_token' => $_ENV["OAUTH_ACCESS_TOKEN"],
            'oauth_access_token_secret' => $_ENV["OAUTH_ACCESS_TOKEN_SECRET"],
            'consumer_key' => $_ENV["CONSUMER_KEY"],
            'consumer_secret' => $_ENV["CONSUMER_SECRET"],
        );

        $url = 'https://api.twitter.com/1.1/search/tweets.json';
        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);

        $twitter2 = [];
        if ($filtros == null) {
            $getfield = '?geocode=' . $lat . ',' . $lng . ',' . $radio . '&count=' . $cantidad;
        } else {
            $listaAtributos = "";
            foreach ($listaFiltros as &$atr) {
                $listaAtributos = $listaAtributos . $atr . ' ';
            }
            $getfield = '?q=' . $listaAtributos . '&geocode=' . $lat . ',' . $lng . ',' . $radio . '&count=' . $cantidad;
        }
        $twitter2[] =  $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($twitter2));
        return $response;
    }

    /**
     * @Route("/api/count", name="count")
     * @return JsonResponse
     * @throws \Exception
     */
    public function getRequestRestantes()
    {
        $settings = array(
            'oauth_access_token' => $_ENV["OAUTH_ACCESS_TOKEN"],
            'oauth_access_token_secret' => $_ENV["OAUTH_ACCESS_TOKEN_SECRET"],
            'consumer_key' => $_ENV["CONSUMER_KEY"],
            'consumer_secret' => $_ENV["CONSUMER_SECRET"],
        );

        $url = 'https://api.twitter.com/1.1/application/rate_limit_status.json';
        $getfield = '?resources=help,users,search,statuses';
        $requestMethod = 'GET';

        $twitter = new TwitterAPIExchange($settings);
        $count = $twitter->setGetfield($getfield)
            ->buildOauth($url, $requestMethod)
            ->performRequest();
        $count22 = json_decode($count);
        $count2 = $count22->{'resources'};


        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($count2));
        return $response;
    }
}
