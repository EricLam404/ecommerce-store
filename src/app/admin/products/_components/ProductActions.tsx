'use client'

import { useTransition } from "react";
import { deleteProduct, toggleProductAvailablitiy } from "../../_actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({ id, isAvailableForPurchase }: { id: string, isAvailableForPurchase: boolean}){
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem disabled={isPending} onClick={() => { startTransition(async () => {
        await toggleProductAvailablitiy(id, !isAvailableForPurchase)
        router.refresh()
    }) }}>{isAvailableForPurchase ? "Deactivate" : "Activate"}</DropdownMenuItem>
}

export function DeleteDropdownItem({ id, disabled }: { id: string, disabled: boolean}){
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return <DropdownMenuItem variant="destructive" disabled={isPending || disabled} onClick={() => { startTransition(async () => {
        await deleteProduct(id)
        router.refresh()
    }) }}>Delete</DropdownMenuItem>
}