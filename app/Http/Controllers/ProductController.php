<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use App\Product as Product;
use DB;
use Psy\Util\Json;
use Session;
use App\Cart;

class ProductController extends Controller
{
    public function show(){

        $product = Product::all();
        $prodotti = null;
        return view('Contents/cozahome')->with('product', $product)->with('products', $prodotti);

    }

    public function filter(Request $request){

        if($request->ajax()) {
            $product1 = DB::table('products')->where('gender', $request->get('type'))->get();
            if ($product1){
                return Response()->json(view('Contents/productlist')->with('product', $product1)->render());
            }
            else return response()->json(['errore' => 'errore']);
        }

    }

    public function search(Request $request){
        if($request->ajax()){
            $terms = $request->get('name');
            $productlive = DB::table('products')->where('nome', 'like' , '%' . $terms .'%')->get();
            if ($productlive){
                return Response()->json(view('Contents/productlist')->with('product', $productlive)->render());
            }
            else return response()->json(['errore' => 'errore']);
        }

    }

    public function addToCart(Request $request){

        $cart = Session::get('cart');
        if ($cart) {

            if(in_array($request->id, $cart)){
                $cart[$request->id]["qty"]++;
                Session::put('cart', $cart);
                Session::flash('success','barang berhasil ditambah ke keranjang!');
            } else {

            $productcart = DB::table('products')->where('id', $request->id)->get();
            $cart[$productcart[0]->id] = array(
                "id" => $productcart[0]->id,
                "nome_prodotto" => $productcart[0]->nome,
                "immagine_path" => $productcart[0]->img_dir,
                "prezzo" => $productcart[0]->price,
                "qty" => 1,
            );

            Session::put('cart', $cart);
            Session::flash('success','barang berhasil ditambah ke keranjang!');

              }
        }

        else {

            $productcart1 = DB::table('products')->where('id', $request->id)->get();
            $cart1 = array();
            $cart1[$productcart1[0]->id] = array(
                "id" => $productcart1[0]->id,
                "nome_prodotto" => $productcart1[0]->nome,
                "immagine_path" => $productcart1[0]->img_dir,
                "prezzo" => $productcart1[0]->price,
                "qty" => 1,
            );

            Session::put('cart', $cart1);
            Session::flash('success','barang berhasil ditambah ke keranjang!');

                }
    }

    public function showcart(Request $request){

        if($request->ajax()) {
            $products = Session::get('cart');
            $qty = 0;
            foreach ($products as $prodotti){
                $qty += $prodotti["qty"];
            }
            return view('Contents/cartlist')->with('products', $products)->with('prezzo', $qty);
        }
    }

}
