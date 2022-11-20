import { NextPage } from "next";
import Button from "@components/Button";
import Input from "@components/Input";
import Select from "@components/Select";

const options = [...new Array(60)].map((_, index) => ({ label: `Option ${index}`, value: index.toString() }))
const HomePage: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="w-60">
        <Select options={options} name="options" required placeholder="Hello..." />
        <select>
          {
            options.map(option => {
              return <option value={option.value}>{option.label}</option>
            })
          }
        </select>
        <button type="submit" className="mt-10">Submit</button>
      </form>

      <div className="h-[1000px]">

      </div>
    </div>
  )
}

export default HomePage;