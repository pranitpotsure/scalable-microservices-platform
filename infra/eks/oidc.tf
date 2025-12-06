resource "aws_iam_openid_connect_provider" "oidc" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["9E99A48A9960B14926BB7F3ABB0C9EA3B5082922"]
  url             = aws_eks_cluster.eks_cluster.identity[0].oidc[0].issuer
}
