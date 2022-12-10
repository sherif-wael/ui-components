import { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Select from "@components/Select";
import React from "react";

const options = [...new Array(10)].map((_, index) => {
    return {
        value: (index + 1).toString(),
        label: `Option ${index + 1}`,
    };
});

const HomePage: NextPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={(e) => e.preventDefault()}>
                <Input size="md" error="Test" label="Name" name="name" />
                <button type="submit" />
            </form>
        </div>
    );
};

export default HomePage;
