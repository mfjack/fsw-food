import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);

  return (
    <div className="flex h-screen flex-col overflow-auto py-5 [&::-webkit-scrollbar]:hidden">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>
          <Card className="my-5">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subtotal: </span>
                <span>{formatCurrency(subtotalPrice)}</span>
              </div>

              <Separator className="w-full border" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Entrega</span>
                {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                  <span className="font-medium uppercase text-primary">
                    Grátis
                  </span>
                ) : (
                  formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                )}
              </div>

              <Separator className="w-full border" />

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Desconto: </span>
                <span>{formatCurrency(totalDiscount)}</span>
              </div>

              <Separator className="w-full border" />

              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Total: </span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <h2 className="text-left font-medium">Sua sacola está vazia.</h2>
      )}
    </div>
  );
};

export default Cart;
