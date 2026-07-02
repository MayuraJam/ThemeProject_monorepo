"use client"
import { useState } from "react";
import ModalComponent from "./ModalComponent";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ExampleModal({ isOpen, onClose }: ModalProps) {
    return (
        <>
            <ModalComponent isOpen={isOpen} onClose={onClose} title="Example Modal">
                <>
                    <h1>Example Modal</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </>
        </ModalComponent>
        </>
    )
}