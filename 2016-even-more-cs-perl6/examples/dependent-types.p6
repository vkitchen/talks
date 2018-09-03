subset Prime of Int where *.is-prime;
my Prime $x = 3;
$x = 11; # Works
$x = 4; # Fails with type mismatch
