import { Button, TextField } from "@material-ui/core";
var userName = "7hVdjNWT6a5nWxJzOMRwZh8L60yvjQpdiy8khFdA"
var lamp = 17
var ip = "192.168.8.100"

export default function LampConfig() {

    return (
        <form>
            <TextField label="USERNAME" color="primary" variant="outlined" name="username" defaultValue={userName} />
            <TextField label="IP - ADDRESS" color="primary" variant="outlined" name="ip" defaultValue={ip} />
            <TextField label="LAMP-ID" color="primary" variant="outlined" name="lamp"  defaultValue={lamp} />
            <Button type="submit" variant="outlined" color="primary">Confirm Changes</Button>
        </form>
    )
}