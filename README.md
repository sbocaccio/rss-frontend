
# Dependencies:
The project use @vue/cli version 4.5.13 on Ubuntu. 

*You can download npm with the following command:*

    sudo apt install npm


## Create the virtual environment

**The virtualenv package is required to create virtual environments. You can install it with pip:**

    pip install virtualenv

**To create a virtual environment, you must specify a path. For example to create one in the local directory called ‘myproject’, type the following:**

    virtualenv myproject

**Activate myproject environment by running the following command:**

    source myproject/bin/activate

*You should see the name of your virtual environment in brackets on your terminal line e.g. (mypython).
Any python commands you use will now work with your virtual environment*

## Install dependencies

Running:
    npm install

from inside your app directory (i.e. where package.json is located) will install the dependencies for your app. These will be placed in ./node_modules relative to your package.json file


# Useful commands
## How to open the server:

In the same directory run

    npm run serve



