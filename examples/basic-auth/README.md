This example demonstrates how to perform a simple web service call with basic authentication.

## Set-up

Before running this example, you need to clone this repository and install the dependencies:

``` sh
$ git clone https://github.com/Sage-ERP-X3/api1-examples.git
$ cd api-examples
$  npm install
```

You should also install streamline.js globally:

``` sh
$ npm install -g streamline
```

Then you need to copy the config file and edit it:
```sh
$ cp config-template.json config.json
$ # edit the file and set the login, password, host and endpoint values
```

## Running the example

You run the example with:

``` sh
$ _node examples/basic-auth
```

This will display a list of customer code / customer name pairs.

